import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { backendUrl } from "../settings";

import "holderjs";
import Header from "../Header/Header";

import { MovieCardGroup } from "./body/MovieCardGroup";
import { ListCardGroup } from "./body/ListCardGroup";

const Home = () => {
  const [moviesSortedByRating, setMoviesSortedByRating] = useState([]);
  const [moviesRandom, setMoviesRandom] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/homepage/`)
      .then((response) => response.json())
      .then((response) => {
        setMoviesRandom(response.data.moviesRandom);
        setMoviesSortedByRating(response.data.moviesSortedByRating);
        setLists(response.data.lists);
      })
      .catch((err) => console.log(err));
  }, []);

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
          {/* TODO Recently Joined Users for homepage */}
          {/* <h2>Recently Joined Users</h2> */}
          {/* TODO implement List for homepage */}
          {/* <ListCardGroup Lists={lists} /> */}
        </div>
      </Stack>
    </Stack>
  );
};
export default Home;
