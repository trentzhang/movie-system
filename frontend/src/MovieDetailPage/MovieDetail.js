import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../Authentication/Firebase";
import Header from "../Header/Header";
import { ListCardGroup } from "../Home/body/ListCardGroup";
import { backendUrl } from "../settings";
import RatingsComponent from "./LikeButton/LikeButton";
import "./MovieDetail.sass";

import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

function MovieDetail() {
  const navigate = useNavigate();
  const { movie_Id } = useParams();
  const [movieData, setMovieData] = useState({
    id: movie_Id,
    title: null,
    release_year: null,
    runtime: null,
    type: null,
    description: null,
    cover: null,
    production: null,
    language: null,
    liked_num: null,
    rating: null,
    rate_num: null,
    liked_users: [],
    comments: [],
    related_lists: [],
  });

  const [liked, setLiked] = useState(false);

  const [user, setUser] = useState(null);

  async function currentUserLikeThisMovie(email, movie_Id) {
    try {
      const response = await fetch(
        `${backendUrl}/liked/movies/${email}/${movie_Id}`
      );
      const data = (await response.json()).data;

      return data ? true : false;
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      console.log("authUser :>> ", authUser);
      if (authUser) {
        setUser(authUser);
        const userLikedMovie = await currentUserLikeThisMovie(
          authUser.email,
          movie_Id
        );
        setLiked(userLikedMovie);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch movie data
        const movieResponse = await fetch(`${backendUrl}/movies/${movie_Id}`);
        const movieData = await (await movieResponse.json()).data;

        // Fetch related lists
        const lists = await Promise.all(
          movieData.related_lists.map(async (list) => {
            const listResponse = await fetch(`${backendUrl}/lists/${list.id}`);
            const listData = await listResponse.json();
            return listData.data;
          })
        );

        // Update movie data with related lists
        setMovieData({ ...movieData, lists });
      } catch (error) {
        console.error("Error fetching movie data:", error);
        alert("Oops! We Couldn't Find This Movie, Please Try Again!");
      }
    }

    fetchData();
  }, [movie_Id, user, liked]);

  async function changeLike() {
    if (!user) {
      alert("Please login first!");
      return false;
    }

    const email = user.email;
    const requestMethod = liked ? "DELETE" : "PUT";

    try {
      const request = {
        method: requestMethod,
        credentials: "omit",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      await fetch(`${backendUrl}/liked/movies/${email}/${movie_Id}`, request);

      setLiked(!liked);
    } catch (error) {
      console.log(error);
      alert("Oops! Like Operation API Wrong, Please Try Again!");
    }
  }

  // set liked to false when user logged out
  useEffect(() => {
    if (!user) {
      setLiked(false);
    }
  }, [user]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.username} {props.email}
    </Tooltip>
  );

  return (
    <Stack gap={3}>
      <Header />

      <Container className="p-3">
        <Stack className="text-bg-dark" gap={3}>
          <script src="holder.js"></script>

          <Card.Body>
            <Button
              className="btn-secondary"
              onClick={() => navigate(-1)}
              key="back-button"
            >
              Back
            </Button>

            <Row>
              <Col
                xs="6"
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Image
                  src={movieData.cover}
                  className="mx-auto"
                  width="200"
                  height="300"
                />
              </Col>
              <Col>
                <h2>{movieData.title}</h2>
                <br />
                <div>
                  <b>Type:</b> {movieData.type}
                </div>
                <div>
                  <b>Release year:</b> {movieData.release_year}
                </div>
                <div>
                  <b>Run Time:</b> {movieData.runtime} min
                </div>
                <div>
                  <b>Production:</b> {movieData.production}
                </div>
                <div>
                  <b>Language:</b> {movieData.language}
                </div>
                <div>
                  <b>Liked Number:</b> {movieData.liked_num}
                </div>
                <div>
                  <b>Rate Number:</b> {movieData.rate_num}
                </div>
                <div>
                  <b>Rating:</b> {movieData.rating}
                </div>
                <div>
                  <RatingsComponent liked={liked} clickFunc={changeLike} />
                </div>
              </Col>
            </Row>
          </Card.Body>

          <Card.Body>
            <b>Description:</b> {movieData.description}
          </Card.Body>

          <Card.Body>
            <b>They also liked this movie:</b>
            <Card.Text>
              {movieData.liked_users
                ? movieData.liked_users.map((value, index) => (
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(value)}
                      key={index}
                    >
                      <Link to={`/user/${value.email}`}>
                        <img
                          src={genderDefaultAvater(value.gender)}
                          className="rounded-circle my-avater-img"
                          alt="Avatar"
                        />
                      </Link>
                    </OverlayTrigger>
                  ))
                : null}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            <b>Lists you may be interested in:</b>
            <ListCardGroup Lists={movieData.lists} />
            <Stack direction="horizontal" gap={3}></Stack>
          </Card.Body>

          <Card.Body>
            <b>User review</b>
            <CommentSection movieData={movieData} />
          </Card.Body>
        </Stack>
      </Container>
    </Stack>
  );
}

export default MovieDetail;

export const genderDefaultAvater = (gender) => {
  if (gender === "male") {
    return "https://www.w3schools.com/howto/img_avatar.png";
  } else {
    return "https://www.w3schools.com/howto/img_avatar2.png";
  }
};
