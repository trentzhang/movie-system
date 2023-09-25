import React, { useEffect, useState } from "react";
import { Card, Container, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// import "holderjs";
import { auth } from "../Authentication/Firebase";
import { useCookies } from "react-cookie";

const ListCard = (movieList) => {
  //   console.log(movieList);
  const [disable, setDisable] = useState(false);
  const [cookies] = useCookies();

  const handleFav = () => {
    // Like list, add it to my lists
    if (auth.currentUser) {
      setDisable(true);
      const request = {
        method: "PUT",

        credentials: "omit",
        // headers: { "Content-type": "text/plain" },
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
        },
      };
      fetch(
        "http://34.125.130.128:4000/user/liked/lists/" + movieList.info.id,
        request
      )
        .then((data) => {
          console.log("parsed json", data);
          return data.json();
        })
        .then(
          (data) => {
            console.log("parsed json", data);
          },
          (ex) => {
            console.log("parsing failed", ex);
          }
        );
    } else {
      alert("Please login first!");
    }
  };

  //   console.log("list to save", movieList);
  // movieList.cover = coverURL(movieList.valueProps.cover);
  // console.log('ml is:',movieList.info);
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
        <div>Created by {movieList.info.owner_info.username} </div>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
