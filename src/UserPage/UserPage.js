import { backendUrl } from "../settings";
import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";

import Header from "../Header/Header";
import { useParams, useNavigate } from "react-router";
import BasicInfo from "./BasicInfo";
import Avater from "./Avater";
import { useCookies } from "react-cookie";

import MovieListTabs from "./MovieListTabs";
import CreateNewList from "./CreateNewList";

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
            fetch(`${backendUrl}/user/movies/${movie.id}`, {
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
            fetch(`${backendUrl}/user/lists/${list.id}`, {
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
        // console.log(res);
        setUserData({ ...res, movies: movies, lists: lists });
      })
      .catch((e) => {
        console.log(e);
        alert("Oops! We Couldn't Find This Guy, Please Try Again!");
        navigate(-1);
      });
  }, []);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Header />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <Avater userData={userData} />
            {/* <CreateNewList /> */}
          </MDBCol>
          <MDBCol lg="8">
            <BasicInfo userData={userData} />

            <MovieListTabs userData={userData} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
