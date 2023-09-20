import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { backendUrl } from "../settings";
import "./Home.css";
import Header from "../Header/Header";
import "holderjs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";

import { MovieCard } from "../Components/Cards/MovieCard";
import { ListCard } from "../Components/Cards/ListCard";

const MovieCardGroup = ({ movies }) =>
  movies.map((m) => {
    console.log("m:", m);
    return (
      <Stack direction="horizontal" className="align-items-stretch" gap={3}>
        <MovieCard info={m} />
      </Stack>
    );
  });

const ListCardGroup = ({ lists }) => (
  <Stack direction="horizontal" className="align-items-stretch" gap={3}>
    {lists.map((l) => (
      <ListCard info={l} />
    ))}
  </Stack>
);

const handleUnlogin = () => {
  // e.preventDefault();
  //   alert("Please Sign Up or Log In First!");
};
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const cookies = useCookies();
  const login = JSON.parse(window.localStorage.getItem("login"));
  //   console.log("login_status:", login);
  //   console.log("lcookie:", cookies);
  // const [cookies] = useCookies();

  useEffect(() => {
    const request = {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    };

    fetch(`${backendUrl}/homepage/`, request)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.data);

        if (!login) {
          console.log(response.data);
          setMovies(response.data.movies);
          setLists(response.data.lists);
        } else {
          setMovies(response.data.recommendedMovies);
          setLists(response.data.recommendedLists);
        }
      })
      .catch((err) => console.log(err));
  }, [login, cookies.email, cookies.accessToken]);

  window.addEventListener("storage", () => {
    // When local storage changes, dump the list to
    // the console.
    // console.log(JSON.parse(window.localStorage.getItem("login")));
  });
  //   console.log(login);
  if (!login) {
    return (
      <Stack gap={3}>
        <Header />
        <Container onClick={handleUnlogin}>
          <Stack gap={3}>
            <h2>Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={movies} />
            </Stack>
            <h2>Lists</h2>
            <Stack direction="horizontal" gap={3}>
              <ListCardGroup lists={lists} />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  } else {
    return (
      <Stack gap={3}>
        <Header />
        <Container>
          <Stack gap={3}>
            <h2>Your Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={movies} />
            </Stack>
            <h2>Recommended Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={movies} />
            </Stack>
            <h2>Your Lists</h2>
            <Stack direction="horizontal" gap={3}>
              <ListCardGroup lists={lists} />
            </Stack>
            <h2>Recommended Lists</h2>
            <Stack direction="horizontal" gap={3}>
              <ListCardGroup lists={lists} />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  }
};
export default Home;
