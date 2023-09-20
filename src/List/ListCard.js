import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { coverURL } from "../Misc/functions";
import { auth } from "../LoginRegisterModal/Firebase";
import { useCookies } from "react-cookie";

const ListCard = ({ movieList }) => {
  console.log(movieList);
  const [disable, setDisable] = useState(false);
  const [cookies] = useCookies();
  const handleFav = () => {
    // Like list, add it to my lists
    if (auth.currentUser) {
      setDisable(true);
      const request = {
        method: "PUT",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
        },
        body: JSON.stringify({
          list_id: movieList.id,
          user_id: auth.currentUser.email,
        }),
      };
      fetch("${backendUrl}/add_fav_list", request)
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
  console.log(movieList);
  movieList.cover = coverURL(movieList.movies[0].cover);
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Body>
        <script src="holder.js"></script>
        <Card.Title style={{ height: "2.2rem" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/list/".concat(movieList.id)}
          >
            {movieList.list_name}
          </Link>
          <Button
            variant="outline-primary"
            width="180"
            disabled={disable}
            onClick={handleFav}
          >
            +
          </Button>
        </Card.Title>
        <Link to={"/list/".concat(movieList.id)}>
          <Card.Img
            variant="top"
            width="200"
            heigh="300"
            src={movieList.cover}
          />
        </Link>
        <hr />
        <div>Created by {movieList.level} member:</div>
        <Link to={"/users/".concat(movieList.creator)}>
          <div>{movieList.owner.username}</div>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
