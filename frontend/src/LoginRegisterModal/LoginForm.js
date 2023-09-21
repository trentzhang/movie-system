import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

import RegisterForm from "./RegisterForm.js";
// import { auth } from "./Firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { backendUrl } from "../settings";

import { useCookies } from "react-cookie";
var x = 0;

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setCookie] = useCookies(["accessToken", "email"]);

  const onClickSignIn = (e) => {
    e.preventDefault();
    console.log({
      email: email,
      password: password,
    });
    const request = {
      method: "POST",
      mode: "cors",
      //   credentials: "omit",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(`${backendUrl}/auth/user/login`, request)
      .catch((e) => {
        console.log(e);
        alert("Oops! Something Went Wrong, Please Try Again!");
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ERROR: Encounter error during user login.") {
          alert("Wrong username or password");
        } else {
          // save email and accessToken to cookies after logged in
          let expires = new Date();
          expires.setTime(expires.getTime() + 1000 * 1000);

          setCookie("accessToken", res.data, {
            path: "/",
            expires,
          });
          setCookie("email", email, {
            path: "/",
            expires,
          });
          //   change login state
          setLogin(true);
          // alert("Login Success!");
          window.location.reload(false);
        }
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
