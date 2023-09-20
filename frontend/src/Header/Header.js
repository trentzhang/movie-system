import { Container, Navbar } from "react-bootstrap";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import LoginIndicator from "../LoginRegisterModal/LoginIndicator";
const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home" style={{ fontWeight: "bold" }}>
          3 >> 4
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
