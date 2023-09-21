import React, { useEffect, useState } from "react";
import { Carousel, Container, Stack } from "react-bootstrap";
import { backendUrl } from "../settings";
// import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "holderjs";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";

import { ListCard } from "../Components/Cards/ListCard";
import { MovieCardGroup } from "./body/MovieCardGroup";

// const ListCardGroup = ({ lists }) => (
//   <Stack direction="horizontal" className="align-items-stretch" gap={3}>
//     {lists.map((l) => (
//       <ListCard info={l} key={l.id} />
//     ))}
//   </Stack>
// );

const ListCardGroup = ({ lists }) => (
  <Carousel>
    {lists.map((l) => {
      return (
        <Carousel.Item>
          <ListCard info={l} />
        </Carousel.Item>
      );
    })}
  </Carousel>
);

// const handleUnlogin = () => {
//   e.preventDefault();
//     alert("Please Sign Up or Log In First!");
// };
const Home = () => {
  const [moviesSortedByRating, setMoviesSortedByRating] = useState([]);
  const [moviesRandom, setMoviesRandom] = useState([]);
  const [lists, setLists] = useState([]);
  const cookies = useCookies();
  const login = JSON.parse(window.localStorage.getItem("login"));
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
          //   console.log(response.data);
          setMoviesRandom(response.data.moviesRandom);
          setMoviesSortedByRating(response.data.moviesSortedByRating);
          setLists(response.data.lists);
        } else {
          //   setMovies(response.data.recommendedMovies);
          //   setLists(response.data.recommendedLists);
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
        <Container>
          <Stack gap={3}>
            <h2>Top Rated Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={moviesSortedByRating} />
            </Stack>
            <h2>Random Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={moviesRandom} />
            </Stack>
            {/* <h2>Lists</h2>
            <Stack direction="horizontal" gap={3}>
              <ListCardGroup lists={lists} />
            </Stack> */}
          </Stack>
        </Container>
      </Stack>
    );
  } else {
    // return (
    //   <Stack gap={3}>
    //     <Header />
    //     <Container>
    //       <Stack gap={3}>
    //         <h2>Your Movies</h2>
    //         <Stack direction="horizontal" gap={3}>
    //           {/* <MovieCardGroup movies={movies} /> */}
    //         </Stack>
    //         <h2>Recommended Movies</h2>
    //         <Stack direction="horizontal" gap={3}>
    //           {/* <MovieCardGroup movies={movies} /> */}
    //         </Stack>
    //         <h2>Your Lists</h2>
    //         <Stack direction="horizontal" gap={3}>
    //           {/* <ListCardGroup lists={lists} /> */}
    //         </Stack>
    //         <h2>Recommended Lists</h2>
    //         <Stack direction="horizontal" gap={3}>
    //           {/* <ListCardGroup lists={lists} /> */}
    //         </Stack>
    //       </Stack>
    //     </Container>
    //   </Stack>
    // );
  }
};
export default Home;
