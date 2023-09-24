import React, { useEffect, useState } from "react";
import { backendUrl } from "../settings";

import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import Header from "../Header/Header";
import Avater from "./Components/Avater";
import BasicInfo from "./Components/BasicInfo";

import { Col, Container, Row } from "react-bootstrap";
import LikedMovieListTabs from "./Components/MovieListTabs";
import { MyListsCard } from "./Components/MyLists";
// import CreateNewList from "./CreateNewList";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { email } = useParams();
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
    async function fetchUserData() {
      try {
        const response = await fetch(`${backendUrl}/user/${email}`);
        const data = await response.json();
        const userData = data.data;
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Oops! We Couldn't Find This Guy, Please Try Again!");
      }
    }

    fetchUserData();
  }, []);

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
            <LikedMovieListTabs userData={userData} />
            <MyListsCard userData={userData}></MyListsCard>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
