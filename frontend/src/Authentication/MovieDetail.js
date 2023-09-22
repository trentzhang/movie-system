import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stack,
  Button,
  Container,
  Card,
  Image,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import RatingsComponent from "./LikeButton/LikeButton";
import ListCard from "../List/ListCard";
import "./MovieDetail.sass";
import { coverURL } from "../Misc/functions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import CommentSection from "./CommentSection";
import { set } from "firebase/database";

const MovieDetail = () => {
  const navigate = useNavigate();
  let { movie_Id } = useParams();
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
  const [inList, setInList] = useState(false);

  const [cookies] = useCookies();

  useEffect(() => {
    fetch(`http://localhost:8000/user/movies/${movie_Id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
        alert(
          `Oops! We Couldn't Find This Movie at http://localhost:8000/user/movies/${movie_Id}, Please Try Again!`
        );
      })
      .then(async (res) => {
        console.log(res);
        const lists = await Promise.all(
          res.related_lists.map((list) =>
            fetch(`http://localhost:8000/user/lists/${list.id}`, {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                // "Access-Control-Allow-Origin": "*",
                // cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
              },
            })
              .then((res) => res.json())
              .then((res) => res.data)
              .catch((e) => {
                console.log(e);
                alert(
                  `Oops! We Couldn't Find This Movie at http://localhost:8000/user/lists/${list.id}, Please Try Again!`
                );
              })
          )
        );
        setMovieData({ ...res, lists: lists });
        setLiked(res.isLikedByUser);
        setInList(res.isAddedToList);
      });
  }, [liked, inList]);

  //   useEffect(() => {
  //     console.log(1111);
  //     if (cookie.email && liked_users && liked_users.includes(cookie.email)) {
  //       setLiked(true);
  //     }
  //   }, [liked_users]);
  const handleAddToList = () => {
    const request = {
      method: "PUT",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    };
    fetch(`http://localhost:8000/user/lists/movies/${movie_Id}`, request);
    window.location.reload(false);
  };
  const handleDelFromList = () => {
    const request = {
      method: "DELETE",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    };
    fetch(`http://localhost:8000/user/lists/movies/${movie_Id}`, request);
    window.location.reload(false);
  };

  const changeLike = () => {
    if (JSON.parse(window.localStorage.getItem("login"))) {
      setLiked(!liked);
      if (!liked) {
        // console.log("put api, add like to database ");
        const request = {
          method: "PUT",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
          },
        };
        fetch(
          `http://localhost:8000/user/liked/movies/${movie_Id}`,
          request
        ).catch((e) => {
          console.log(e);
          alert("Oops! Like Operation API Wrong, Please Try Again!");
        });
      } else {
        // console.log("delete api, delete like to database ");
        const request = {
          method: "DELETE",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
          },
        };
        fetch(`http://localhost:8000/user/liked/movies/${movie_Id}`, request);
      }
    } else {
      alert("Please login first!");
      return false;
    }
  };

  return (
    <Stack gap={3}>
      <Header />
      <Container className="mb-2">
        <Card>
          <script src="holder.js"></script>
          <Card.Body>
            <Button
              variant="secondary"
              className="back-button"
              onClick={() => navigate(-1)}
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
                  heigh="300"
                />
              </Col>
              <Col>
                <h2>{movieData.title}</h2>
                <br />
                {/* <div>
                  <b>Director:</b> {director}
                </div>
                <div>
                  <b>Writer:</b> {writer}
                </div> */}
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
                <div>
                  <Button
                    variant="outline-primary"
                    width="80"
                    disabled={inList}
                    onClick={handleAddToList}
                  >
                    +
                  </Button>
                  {"          "}
                  <Button
                    variant="outline-primary"
                    width="100"
                    disabled={!inList}
                    onClick={handleDelFromList}
                  >
                    -
                  </Button>
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
                ? movieData.liked_users.map((value, _) => {
                    const renderTooltip = (props) => (
                      <Tooltip id="button-tooltip" {...props}>
                        {value.username} {value.email}
                      </Tooltip>
                    );
                    return (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <Link to={"/user/".concat(value.email)}>
                          <img
                            src={genderDefaultAvater(value.gender)}
                            class="rounded-circle my-avater-img"
                            alt="Avatar"
                          />
                        </Link>
                      </OverlayTrigger>
                    );
                  })
                : null}
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <b>Lists you may interested</b>
            <Stack direction="horizontal" gap={3}>
              {movieData.lists
                ? movieData.lists.map((item, _) => {
                    return <ListCard movieList={item} user_id="" />;
                  })
                : null}
            </Stack>
          </Card.Body>
          <Card.Body>
            <b>User review</b>
            <CommentSection movieData={movieData} />
          </Card.Body>
        </Card>
      </Container>
    </Stack>
  );
};

export default MovieDetail;

export const genderDefaultAvater = (gender) => {
  if (gender === "male") {
    return "https://www.w3schools.com/howto/img_avatar.png";
  } else {
    return "https://www.w3schools.com/howto/img_avatar2.png";
  }
};
