import React, { useEffect, useState } from "react";
import { backendUrl } from "../settings";

import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import Header from "../Header/Header";
import Avater from "./Avater";
import BasicInfo from "./BasicInfo";

import { Col, Container, Row, Stack } from "react-bootstrap";
import MovieListTabs from "./MovieListTabs";
// import CreateNewList from "./CreateNewList";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [cookies] = useCookies();
  const [userData, setUserData] = useState({
    username: null,
    email: null,
    gender: null,
    birthday: null,
    avatar: null,
    lists: [],
    movies: [],
  });

  useEffect(() => {
    fetch(`${backendUrl}/user/${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.data)

      .then(async (res) => {
        const movies = await Promise.all(
          res.movies.map((movie) =>
            fetch(`${backendUrl}/movies/${movie.id}`, {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
              },
            })
              .then((res) => res.json())
              .then((res) => res.data)
          )
        );
        const lists = await Promise.all(
          res.lists.map((list) =>
            fetch(`${backendUrl}/lists/${list.id}`, {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
              },
            })
              .then((res) => res.json())
              .then((res) => res.data)
          )
        );
        setUserData({ ...res, movies: movies, lists: lists });
      })
      .catch((e) => {
        console.log(e);
        alert("Oops! We Couldn't Find This Guy, Please Try Again!");
        // navigate(-1);
      });
  }, [cookies.accessToken, cookies.email, email, navigate]);

  return (
    <section>
      <Header />
      <Container className="py-5">
        <Row>
          <Col lg="4">
            <Avater userData={userData} />
            {/* <CreateNewList /> */}
            <BasicInfo userData={userData} />
          </Col>
          <Col lg="8">
            <MovieListTabs userData={userData} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
