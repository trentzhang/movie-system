import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, Navbar, Stack } from "react-bootstrap";

import { useParams } from "react-router";
import { MovieCardGroup } from "../Home/body/MovieCardGroup";
// import LikeButton from "../MovieDetailPage/LikeButton/LikeButton.js";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";
import { backendUrl } from "../settings";

const ListPage = () => {
  const [show, setShow] = useState(false);
  const [content, setMovies] = useState([]);
  const [lname, setLname] = useState("");
  const [creator, setCreator] = useState(null);
  const [likedNum, setlikedNum] = useState(null);
  const { list_id } = useParams();
  const [ldesc, setLdesc] = useState("No Description About This List Yet!!");
  const [cookies] = useCookies();

  useEffect(() => {
    fetch(`${backendUrl}/lists/` + list_id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLname(res.data.name);
        setCreator(res.data.creator);
        setLdesc(res.data.description);
        setlikedNum(res.data.liked);
        setMovies(res.data.movies);
      })
      .catch((e) => {
        console.log(e);
        alert("Oops! Something Went Wrong, Please Try Again!");
      });
  }, [cookies, list_id]);

  return (
    <Stack gap={3}>
      <Header />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>{lname}</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="me-auto">
            <Nav.Link onClick={() => setShow(true)}>Description</Nav.Link>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Description About {lname}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{ldesc}</p>
              </Modal.Body>
            </Modal>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link disabled>Created by {creator} </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link disabled>Liked by {likedNum} Users</Nav.Link>
          </Nav>
          {/* <LikeButton /> */}
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
      <br />
      <Container className="mb-2">
        <Stack>
          <Container>
            <MovieCardGroup movies={content}></MovieCardGroup>
          </Container>
        </Stack>
      </Container>
    </Stack>
  );
};

export default ListPage;
