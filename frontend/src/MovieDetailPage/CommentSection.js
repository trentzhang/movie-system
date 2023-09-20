import React, { useState } from "react";
import { backendUrl } from "../settings";
import { Card, ListGroup, Stack, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";
const CommentSection = ({ movieData }) => {
  // console.log(value.user);
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
  const { movie_Id } = useParams();

  const AddReview = (e) => {
    setShow(false);
    const request = {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ review: review }),
    };
    fetch(`${backendUrl}/user/movies/${movie_Id}/comments`, request).then(() =>
      window.location.reload(false)
    );
  };
  const [show, setShow] = useState(false);
  const [review, setReview] = useState(false);
  return (
    <Stack direction="horizontal" gap={3} className="flex-container">
      <Card
        style={{ width: "18rem", minWidth: "10rem", fontSize: "15px" }}
        className="py-5 px-2 text-center"
        onClick={() => setShow(true)}
      >
        Add Your Review
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group my-3">
              <textarea
                class="form-control"
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
      </Card>
      {movieData.comments
        ? movieData.comments.map((value, _) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "18rem", minWidth: "10rem", fontSize: "15px" }}
              className="mb-2"
            >
              <Card.Header>
                {value.username} ({value.user_email})
              </Card.Header>
              <Card.Body>
                {/* <Card.Title>{variant} Card Title </Card.Title> */}
                <Card.Text>{value.comment}</Card.Text>
                <ListGroup.Item size="lg">{value.created_time}</ListGroup.Item>
              </Card.Body>
            </Card>
          ))
        : null}
    </Stack>
  );
};

CommentSection.propTypes = {};

export default CommentSection;
