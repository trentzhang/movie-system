import React from "react";
import { Row, Col, Container, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { coverURL } from "../Misc/functions";
import "./MovieCard.scss";

function MovieCard({ item, index }) {
  //   console.log(item);
  item.cover = coverURL(item.cover);

  return (
    <Container className="movie-card">
      <Card>
        <Col className="movie-card-index-col">{index + 1}</Col>

        <Card.Body>
          <Row>
            <Col xs="5" className="Movie-img-info-Row">
              <Link to={"/movie/" + item.id}>
                <Image
                  src={item.cover}
                  height="150"
                  width="100"
                  className="mx-auto"
                />
              </Link>
            </Col>
            <Col xs="7" className="Movie-text-info-Row">
              <Link to={"/movie/" + item.id}>
                <h3>{item.title}</h3>
              </Link>
              <div>Runtime: {item.runtime} min</div>
              <div>Release Year: {item.release_year}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MovieCard;
