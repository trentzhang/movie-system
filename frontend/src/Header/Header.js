import { Container, Navbar } from "react-bootstrap";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import LoginIndicator from "../Authentication/LoginIndicator";
const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home" style={{ fontWeight: "bold" }}>
          Movies!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <LoginIndicator />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
