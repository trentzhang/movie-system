import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Image,
  Modal,
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
import RatingsComponent from "./Components/LikeButton/LikeButton";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import AddToListButton from "./Components/AddToListButton/AddToListButton";
import { genderDefaultAvater } from "./MovieDetail";

export function MovieDetail() {
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

  // Initialize like status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
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
  }, [movie_Id]);

  // Update movie detail when movie ID change
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
  }, [movie_Id]);

  // Change movie liked number and they also liked this movie section when like state changed
  useEffect(async () => {
    if (auth.currentUser) {
      const likeNumChange = liked ? 1 : -1;
      const currentUserInfo = (
        await (
          await fetch(`${backendUrl}/user/basicInfo/${auth.currentUser.email}`)
        ).json()
      ).data;

      // Update movie data with related lists
      setMovieData((prevData) => ({
        ...prevData,
        liked_num: movieData.liked_num + likeNumChange,
        liked_users: liked
          ? [...prevData.liked_users, currentUserInfo]
          : prevData.liked_users.filter((user) => user === currentUserInfo),
      }));
    }
  }, [liked]);

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

  // Send API to update database when like button is clicked
  async function changeLike() {
    if (!user) {
      alert("Please login first!");
      return false;
    }
    setLiked(!liked);

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
    } catch (error) {
      console.log(error);
      alert("Oops! Like Operation API Wrong, Please Try Again!");
    }
  }

  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [currentUserLists, setCurrentUserLists] = useState([]);

  // if show Add To List Modal state is true, set Current User Lists
  useEffect(() => {
    async function updateList() {
      console.log("showAddToListModal :>> ", showAddToListModal);
      if (showAddToListModal && auth.currentUser) {
        const userLists = (
          await (
            await fetch(`${backendUrl}/lists/email/${auth.currentUser.email}`)
          ).json()
        ).data;
        console.log("userLists :>> ", userLists);
        setCurrentUserLists(userLists);
      }
    }
    updateList();
  }, [showAddToListModal]);

  function AddListModal() {
    return (
      <Modal
        show={showAddToListModal}
        onHide={() => {
          setShowAddToListModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add to my list</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Select an List
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#option1">Option 1</Dropdown.Item>
              <Dropdown.Item href="#option2">Option 2</Dropdown.Item>
              <Dropdown.Item href="#option3">Option 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Button>Confirm</Button>
      </Modal>
    );
  }

  return (
    <Stack gap={3}>
      <Header />

      <Container className="p-3">
        <Stack className="text-bg-dark" gap={3}>
          <script src="holder.js"></script>
          <Row className="vh-30">
            <Stack gap={3} className="flex-md-row">
              <Image src={movieData.cover} className="h-100 object-cover" />

              <Col className="d-flex flex-column">
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
                <div className="mt-auto">
                  <RatingsComponent liked={liked} clickFunc={changeLike} />
                  <AddToListButton
                    clickFunc={() => {
                      if (auth.currentUser) {
                        setShowAddToListModal(true);
                      } else {
                        alert("Please log in first!");
                      }
                    }}
                  ></AddToListButton>
                  <AddListModal></AddListModal>
                </div>
              </Col>
            </Stack>
          </Row>
          <b>Description:</b>
          <p className="text-break">{movieData.description}</p>
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
          <b>Lists you may be interested in:</b>
          <ListCardGroup Lists={movieData.lists} />
          <Stack direction="horizontal" gap={3}></Stack>
          <b>User review</b>
          <CommentSection movieData={movieData} />
        </Stack>
      </Container>
    </Stack>
  );
}
