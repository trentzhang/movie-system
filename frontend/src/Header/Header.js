import { Container, Navbar, Stack } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import IndexBar from "./IndexBar";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" style={{ fontWeight: "bold" }}>
          <Stack direction="horizontal">
            <h6 className="display-6 my-0">Movie Database</h6>
            <sup className="h6 bg-dark text-light rounded px-1 m-1">Beta</sup>
          </Stack>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <IndexBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(Header);
