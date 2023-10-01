import React, { useState } from "react";
import { backendUrl } from "../../settings";
import {
  Card,
  ListGroup,
  Stack,
  Modal,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useParams } from "react-router";
import { auth } from "../../Authentication/Firebase";

const array = [
  "Primary",
  "Secondary",
  "Success",
  "Danger",
  "Warning",
  "Info",
  "Light",
  "Dark",
];
const variant = array[Math.floor(Math.random() * array.length)];

function CommentCard({ value, index }) {
  return (
    <Card
      bg={"danger"}
      key={index}
      text={variant.toLowerCase() === "light" ? "dark" : "white"}
      className="mb-3"
    >
      <Card.Header>{value.user_email}</Card.Header>
      <Card.Body>
        <Card.Text>{value.comment}</Card.Text>
        <ListGroup.Item size="lg">{value.created_time}</ListGroup.Item>
      </Card.Body>
    </Card>
  );
}

const CommentSection = ({ movieData }) => {
  const { movie_Id } = useParams();

  const AddReview = async (e) => {
    try {
      const request = {
        method: "POST",
        credentials: "omit",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          comment: review,
          email: auth.currentUser.email,
        }),
      };

      await fetch(`${backendUrl}/movie/comment/${movie_Id}`, request);

      window.location.reload(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Register Failed!\n" + errorCode + errorMessage);
    }
  };

  const [show, setShow] = useState(false);
  const [review, setReview] = useState(false);

  return (
    <Stack gap={3}>
      {/* create Comment card  */}

      <Card className="p-2 text-center text-dark" onClick={() => setShow(true)}>
        Add Your Review
      </Card>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group my-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <Button type="submit" onClick={(e) => AddReview(e)}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>

      <Row sm={1} md={2} xl={3}>
        {/* Comments card*/}
        {movieData.comments
          ? movieData.comments.map((value, index) => (
              <Col>
                <CommentCard value={value} index={index}></CommentCard>
              </Col>
            ))
          : null}
      </Row>
    </Stack>
  );
};

CommentSection.propTypes = {};

export default CommentSection;
