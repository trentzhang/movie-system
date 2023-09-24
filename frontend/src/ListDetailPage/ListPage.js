import React, { useEffect, useState } from "react";
import { Card, Container, Modal, Nav, Navbar, Stack } from "react-bootstrap";
import { useParams } from "react-router";
import { MovieCardGroup } from "../Home/body/MovieCardGroup";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";
import { backendUrl } from "../settings";
import CardHeader from "react-bootstrap/esm/CardHeader";

const ListPage = () => {
  const [listData, setListData] = useState({
    name: "",
    creator: null,
    likedNum: null,
    description: null,
    movies: [],
  });
  const { list_id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${backendUrl}/lists/${list_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setListData({
          name: data.data.name,
          creator: data.data.creator,
          likedNum: data.data.liked,
          description: data.data.description,
          movies: data.data.movies,
        });
      } catch (error) {
        console.error("Error fetching list data:", error);
        alert("Oops! Something Went Wrong, Please Try Again!");
      }
    }

    fetchData();
  }, [list_id]);

  return (
    <Stack gap={3}>
      <Header />
      <Container>
        <Card className="text-dark">
          <CardHeader>
            <Stack direction="horizontal" gap={3}>
              <div>{listData.name}</div>
              <div className="ms-auto">Created by {listData.creator}</div>
              <div>
                Liked by {listData.likedNum ? listData.likedNum : 0} Users
              </div>
            </Stack>
          </CardHeader>
          <Card.Body>
            <Container>
              <p>{listData.description}</p>
              <MovieCardGroup movies={listData.movies}></MovieCardGroup>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </Stack>
  );
};

export default ListPage;
