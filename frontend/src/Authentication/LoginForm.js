import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import RegisterForm from "./RegisterForm.js";

import { backendUrl } from "../settings";

import { useCookies } from "react-cookie";
var x = 0;

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setCookie] = useCookies(["accessToken", "email"]);

  const onClickSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Login Failed \n ${errorMessage}`);
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <form onSubmit={onClickSignIn} id="login">
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}></Col>
        </Form.Group>
      </form>
      <Col sm={{ span: 10, offset: 2 }}>
        <Button
          className="btn-secondary"
          form="login"
          type="submit"
          onSubmit={onClickSignIn}
        >
          Sign in
        </Button>
        or
        <Button className="btn-secondary" type="submit" onClick={handleShow}>
          Create account
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm setShowRegisterModal={setShow} />
          </Modal.Body>
        </Modal>
      </Col>
    </div>
  );
};
export default Login;
export { x };
