import React, { useEffect, useState } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { MovieCardGroup } from "../Home/body/MovieCardGroup";
import { backendUrl } from "../settings";
import { LikeButton } from "../MovieDetailPage/Components/LikeButton/LikeButton";
import { auth } from "../Authentication/Firebase";

const ListPage = () => {
  const [listData, setListData] = useState({
    name: "",
    creator: null,
    liked_num: null,
    description: null,
    movies: [],
  });
  const { list_id } = useParams();
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize like status
  useEffect(() => {
    // use isMounted to avoid auth changed call
    let isMounted = true;

    async function fetchData() {
      try {
        const [userResponse, listResponse] = await Promise.all([
          auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
              setUser(authUser);
              const response = await fetch(
                `${backendUrl}/liked/lists/${authUser.email}/${list_id}`
              );
              const data = (await response.json()).data;

              if (isMounted) {
                setLiked(data ? true : false);
              }
            } else {
              setUser(null);
            }
          }),
          fetch(`${backendUrl}/lists/id/${list_id}`),
        ]);

        if (!listResponse.ok) {
          throw new Error(`HTTP error! Status: ${listResponse.status}`);
        }

        const listData = await listResponse.json();

        if (isMounted) {
          setListData({
            name: listData.data.name,
            creator: listData.data.creator,
            liked_num: listData.data.liked_num,
            description: listData.data.description,
            movies: listData.data.movies,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Oops! Something Went Wrong, Please Try Again!");
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [list_id]);

  // Change list liked number when like state changed
  useEffect(() => {
    async function updateAfterLikedClicked() {
      if (auth.currentUser) {
        const likeNumChange = liked ? 1 : -1;
        try {
          setListData((prevData) => ({
            ...prevData,
            liked_num: prevData.liked_num + likeNumChange,
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

  return (
    <Stack gap={3}>
      <Header />
      <Container>
        <Card className="text-dark">
          <CardHeader>
            <Stack direction="horizontal" gap={3}>
              <div>{listData.name}</div>
              <div className="ms-auto">
                Created by{" "}
                <Link to={`/user/${listData.creator}`}>{listData.creator}</Link>
              </div>
              <div>
                Liked by {listData.liked_num ? listData.liked_num : 0} Users
              </div>
            </Stack>
          </CardHeader>
          <Card.Body>
            <Container>
              <p>{listData.description}</p>
              <MovieCardGroup movies={listData.movies}></MovieCardGroup>
              <LikeButton
                liked={liked}
                currentUser={auth.currentUser}
                id={list_id}
                likedType={"lists"}
                onLikedChange={(newLikedStatus) => {
                  setLiked(newLikedStatus);
                }}
              ></LikeButton>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </Stack>
  );
};

export default ListPage;
