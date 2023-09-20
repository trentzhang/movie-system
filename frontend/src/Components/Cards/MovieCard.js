import { coverURL } from "../../Misc/functions";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ info }) => {
  const login = JSON.parse(window.localStorage.getItem("login"));

  if (!login) {
    // console.log("mc"+login);
    return (
      <Card className="movie_card">
        <Card.Body>
          <Link className="movie_card_link" to={"/home/"}>
            <Card.Title>{info.title}</Card.Title>
            <Card.Img src={coverURL(info.cover)} />
          </Link>
        </Card.Body>
      </Card>
    );
  } else {
    // console.log("mc" + login);
    return (
      <Card className="movie_card">
        <Card.Body>
          <Link className="movie_card_link" to={"/movie/".concat(info.id)}>
            <Card.Title>{info.title}</Card.Title>
            <Card.Img src={coverURL(info.cover)} />
          </Link>
        </Card.Body>
      </Card>
    );
  }
};
