import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { ref, set } from "firebase/database";
import { backendUrl } from "../settings";

// import { useHistory } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const SignUp = ({ setShowRegisterModal }) => {
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  //   const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",

      credentials: "omit",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
        gender: gender,
        birthday: birthday,
      }),
    };
    fetch(`${backendUrl}/auth/user/signup`, request)
      .then((res) => res.json())
      .then((res) => {
        // setShowSuccess(true);
        alert("Registration Success!");
        setShowRegisterModal(false);
        navigate(-1);
      })
      .catch((e) => {
        console.log(e);
        alert("Oops! Something Went Wrong, Please Try Again!");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalUsername"
        >
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>
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
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalGender">
          <Form.Label column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              aria-label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled selected>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-Binary</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalBirthday"
        >
          <Form.Label column sm={2}>
            Birthday
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              id="birthday"
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row} className="mb-3" controlId="successText">
          <Form.Label column sm={2}></Form.Label>
          <Col sm={10} className="primary">
            Success!!
          </Col>
        </Form.Group> */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Create account</Button>
          </Col>
        </Form.Group>
      </div>
    </form>
  );
};

export default SignUp;
