import React, { useEffect, useState } from "react";
import { Card, Container, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Home.css";
import Header from "../Header/Header";
import "holderjs";
import "bootstrap/dist/css/bootstrap.min.css";
// import ListCard from "../List/ListCard";
import { useCookies } from "react-cookie";
import { coverURL } from "../Misc/functions";
import { useNavigate } from "react-router";

const MovieCard = ({ info }) => {
  const login = JSON.parse(window.localStorage.getItem("login"));
  
  if (!login){
    // console.log("mc"+login);
    return(
      <Card className="movie_card">
        <Card.Body>
          <Link className="movie_card_link" to={"/home/"}>
            <Card.Title>{info.title}</Card.Title>
            <Card.Img src={coverURL(info.cover)} />
          </Link>
        </Card.Body>
      </Card>)

  }
  else{
    console.log("mc"+login);
  return(
  <Card className="movie_card">
    <Card.Body>
      <Link className="movie_card_link" to={"/movie/".concat(info.id)}>
        <Card.Title>{info.title}</Card.Title>
        <Card.Img src={coverURL(info.cover)} />
      </Link>
    </Card.Body>
  </Card>)
  }
};

const MovieCardGroup = ({ movies }) =>
  movies.map((m) => {
    // console.log("m:", m);
    return (
      <Stack direction="horizontal" className="align-items-stretch" gap={3}>
        <MovieCard info={m} />
      </Stack>
    );
  });

const ListCard = (movieList) => {
  //   console.log(movieList);
  const login = JSON.parse(window.localStorage.getItem("login"))
  const [cookies] = useCookies();
  const [disable, setDisable] = useState(false);
  const handleFav = () => {
    // Like list, add it to my lists
    if (login) {
      setDisable(true);
      const request = {
        method: "PUT",
        // mode: "cors",
        // credentials: "include",
        headers: { "Content-type": "application/json" ,"Access-Control-Allow-Origin":"*", 'cookies':`email=${cookies.email};accessToken=${cookies.accessToken}`},
      };
      fetch(
        "${backendUrl}/user/liked/lists/" + movieList.info.id,
        request
      ).then((data) => {
        window.location.reload(false);
        return data.json();
      });

      window.localStorage.setItem("login", true);
    } else {
      alert("Please login first!");
    }
  };
  if (movieList.info.movies.length === 0){
    return(<Card style={{ width: "15rem" }}>
    <Card.Body>
      <script src="holder.js"></script>
      <Card.Title style={{ height: "2.2rem", textAlign: "left" }}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={login?"/list/".concat(movieList.info.id):"/home/"}
        >
          {movieList.info.name}
        </Link>
        <Button
          style={{ position: "relative", float: "right" }}
          variant="outline-primary"
          width="80"
          disabled={disable}
          onClick={handleFav}
        >
          +
        </Button>
      </Card.Title>

      <div>
        Likes:{movieList.info.liked}
        <br></br>
        Description:{movieList.info.description}
      </div>
      <Link to={login?"/list/".concat(movieList.info.id):"/home/"}>
        
      </Link>
      <hr />
      <div>Created by {movieList.info.owner_info.username} </div>
    </Card.Body>
  </Card>)
  }
  else{
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Body>
        <script src="holder.js"></script>
        <Card.Title style={{ height: "2.2rem", textAlign: "left" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={login?"/list/".concat(movieList.info.id):"/home/"}
          >
            {movieList.info.name}
          </Link>
          <Button
            style={{ position: "relative", float: "right" }}
            variant="outline-primary"
            width="80"
            disabled={disable}
            onClick={handleFav}
          >
            +
          </Button>
        </Card.Title>

        <div>
          Likes:{movieList.info.liked}
          <br></br>
          Description:{movieList.info.description}
        </div>
        <Link to={login?"/list/".concat(movieList.info.id):"/home/"}>
          <stack>
            <Card.Img
              variant="top"
              width="200"
              heigh="300"
              src={movieList.info.movies[0].cover}
            />
          </stack>
        </Link>
        <hr />
        <div>Created by {movieList.info.owner_info.username} </div>
      </Card.Body>
    </Card>
  );
}
};
const ListCardY = (movieList) => {
  //   console.log(movieList);
  const [disable, setDisable] = useState(false);

  //   console.log("list to save", movieList);
  console.log("ml is:", movieList.info);
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Body>
        <script src="holder.js"></script>
        <Card.Title style={{ height: "2.2rem", textAlign: "left" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/list/".concat(movieList.info.id)}
          >
            {movieList.info.name}
          </Link>
        </Card.Title>

        <div>
          Likes:{movieList.info.liked}
          <br></br>
          Description:{movieList.info.description}
        </div>
        <Link to={"/list/".concat(movieList.info.id)}>
          <stack>
            <Card.Img
              variant="top"
              width="200"
              heigh="300"
              src={movieList.info.movies[0].cover}
            />
          </stack>
        </Link>
        <hr />
      </Card.Body>
    </Card>
  );
};
const ListCardGroup = ({ lists }) => (
  <Stack direction="horizontal" className="align-items-stretch" gap={3}>
    {lists.map((l) => (
      <ListCard info={l} />
    ))}
  </Stack>
);
const ListCardGroupY = ({ lists }) => (
  <Stack direction="horizontal" className="align-items-stretch" gap={3}>
    {lists.map((l) => (
      <ListCardY info={l} />
    ))}
  </Stack>
);
const handleUnlogin = ()=>{
  // e.preventDefault();
  alert("Please Sign Up or Log In First!");
  
};
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const [ymovies, setyMovies] = useState([]);
  const [ylists, setyLists] = useState([]);
  const [cookies, setCookies] = useCookies();
  const login = JSON.parse(window.localStorage.getItem("login"));
  console.log("login_status:", login);
  console.log("lcookie:", cookies);
  // const [cookies] = useCookies();

  const request = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-type": "application/json" ,"Access-Control-Allow-Origin":"*", 'cookies':`email=${cookies.email};accessToken=${cookies.accessToken}`},
  };
  useEffect(() => {
    fetch("${backendUrl}/homepage/", request)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.recommendedLists);
        setMovies(response.data.recommendedMovies);
        setLists(response.data.recommendedLists);
        if (login) {
          console.log(response.data);
          setyMovies(response.data.movies);
          setyLists(response.data.lists);
        }
      })
      .catch((err) => console.log(err));
  }, [login]);
  window.addEventListener("storage", () => {
    // When local storage changes, dump the list to
    // the console.
    console.log(JSON.parse(window.localStorage.getItem("login")));
  });
  //   console.log(login);
  if (!login) {
    return (
      <Stack gap={3}>
        <Header />

        <Container
          onClick={handleUnlogin} >
          <Stack gap={3}>
            <h2>Recommended Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={movies} />
            </Stack>
            <h2>Recommended Lists</h2>
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
              <MovieCardGroup movies={ymovies} />
            </Stack>
            <h2>Recommended Movies</h2>
            <Stack direction="horizontal" gap={3}>
              <MovieCardGroup movies={movies} />
            </Stack>
            <h2>Your Lists</h2>
            <Stack direction="horizontal" gap={3}>
              <ListCardGroupY lists={ylists} />
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
