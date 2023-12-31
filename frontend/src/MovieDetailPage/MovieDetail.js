import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { auth } from "../Authentication/Firebase";
import Header from "../Header/Header";
import { ListCardGroup } from "../Home/body/ListCardGroup";
import { backendUrl } from "../settings";
import { AddMovieToListModal } from "./Components/AddMovieToListModal";
import AddToListButton from "./Components/AddToListButton/AddToListButton";
import CommentSection from "./Components/CommentSection";
import { LikeButton } from "./Components/LikeButton/LikeButton";
import { TheyAlsoLikedTab } from "./Components/TheyAlsoLikedThisMovieTab";
function MovieDetail() {
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
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [currentUserLists, setCurrentUserLists] = useState(null);
  const [successAddedMovie, setSuccessAddedMovie] = useState(false);

  // Initialize like status
  useEffect(() => {
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
            const listResponse = await fetch(
              `${backendUrl}/lists/id/${list.id}`
            );
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
  }, [movie_Id, successAddedMovie]);

  // Change movie liked number and they also liked this movie section when like state changed
  useEffect(() => {
    async function updateAfterLikedClicked() {
      if (auth.currentUser) {
        const likeNumChange = liked ? 1 : -1;
        try {
          const response = await fetch(
            `${backendUrl}/user/basicInfo/${auth.currentUser.email}`
          );
          const data = await response.json();

          const currentUserInfo = data.data;
          setMovieData((prevData) => ({
            ...prevData,
            liked_num: prevData.liked_num + likeNumChange,
            liked_users: liked
              ? [...prevData.liked_users, currentUserInfo]
              : prevData.liked_users.filter((user) => user === currentUserInfo),
          }));
        } catch (error) {
          console.error("Error updating data after liked clicked:", error);
        }
      }
    }

    updateAfterLikedClicked();
  }, [liked]);

  // set liked to false when user logged out
  useEffect(() => {
    if (!user) {
      setLiked(false);
    }
  }, [user]);

  // if show Add To List Modal state is true, set Current User Lists
  useEffect(() => {
    if (showAddToListModal && auth.currentUser) {
      fetch(`${backendUrl}/lists/email/${auth.currentUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentUserLists(data.data);
        })
        .catch((error) => {
          console.error("Error fetching user lists:", error);
        });
    }
  }, [showAddToListModal]);

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
                  <LikeButton
                    liked={liked}
                    currentUser={user}
                    id={movie_Id}
                    likedType={"movies"}
                    onLikedChange={(newLikedStatus) => {
                      setLiked(newLikedStatus);
                    }}
                  ></LikeButton>
                  <AddToListButton
                    clickFunc={() => {
                      if (auth.currentUser) {
                        setShowAddToListModal(true);
                      } else {
                        alert("Please log in first!");
                      }
                    }}
                  ></AddToListButton>
                  <AddMovieToListModal
                    show={showAddToListModal}
                    onHide={() => {
                      setShowAddToListModal(false);
                    }}
                    movie={movie_Id}
                    lists={currentUserLists}
                    onSuccessAdded={() => {
                      setSuccessAddedMovie(true);
                    }}
                  ></AddMovieToListModal>
                </div>
              </Col>
            </Stack>
          </Row>
          <b>Description:</b>
          <p className="text-break">{movieData.description}</p>
          <b>They also liked this movie:</b>
          <TheyAlsoLikedTab
            liked_users={movieData.liked_users}
          ></TheyAlsoLikedTab>
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

export default MovieDetail;
