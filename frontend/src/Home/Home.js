import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { backendUrl } from "../settings";
// import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "holderjs";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";

import { ListCardGroup } from "./body/ListCardGroup";
import { MovieCardGroup } from "./body/MovieCardGroup";

const Home = () => {
  const [moviesSortedByRating, setMoviesSortedByRating] = useState([]);
  const [moviesRandom, setMoviesRandom] = useState([]);
  const [lists, setLists] = useState([]);
  const cookies = useCookies();
  const login = JSON.parse(window.localStorage.getItem("login"));
  //   const [user, setUser] = useState(auth.currentUser);

  // const [cookies] = useCookies();

  useEffect(() => {
    const request = {
      method: "GET",

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
        if (!login) {
        } else {
          //   setMovies(response.data.recommendedMovies);
          //   setLists(response.data.recommendedLists);
        }
        setMoviesRandom(response.data.moviesRandom);
        setMoviesSortedByRating(response.data.moviesSortedByRating);
        setLists(response.data.lists);
      })
      .catch((err) => console.log(err));
  }, [login, cookies.email, cookies.accessToken]);

  window.addEventListener("storage", () => {
    // When local storage changes, dump the list to
    // the console.
  });

  return (
    <Stack gap={3}>
      <Header />

      <Stack gap={3}>
        <div className="text-center">
          <h2>Top Liked Movies</h2>
          <MovieCardGroup movies={moviesSortedByRating} />
          <h2>Random Movies</h2>
          <MovieCardGroup movies={moviesRandom} />
          <h2>Lists</h2>
          <ListCardGroup Lists={lists} />
          <h2>Recently Joined Users</h2>
          {/* TODO implement backend */}
          {/* <ListCardGroup Lists={lists} /> */}
        </div>
      </Stack>
    </Stack>
  );
};
export default Home;
