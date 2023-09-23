import React, { useState } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
// import { ref, set } from "firebase/database";
import { backendUrl } from "../settings";

// import { useHistory } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
// import { useNavigate } from "react-router";

const SignUp = () => {
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  //   const [showSuccess, setShowSuccess] = useState(false);
  //   const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // pass information to MySQL database
      const request = {
        method: "PUT",
        credentials: "omit",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: username,
          email: email,
          gender: gender,
          birthday: birthday,
        }),
      };

      const response = await fetch(`${backendUrl}/user/signup`, request);

      if (!response.ok) {
        await deleteUser(auth.currentUser);
        throw new Error(
          `HTTP error when saving info to database! Status: ${response.status}`
        );
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Register Failed!\n" + errorCode + errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Username*</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Email*</Form.Label>
          <Col>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Password*</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Gender</Form.Label>
          <Col>
            <Form.Select
              aria-label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-Binary</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>Birthday</Form.Label>
          <Col>
            <Form.Control
              type="date"
              id="birthday"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row} className="mb-3" >
          <Form.Label column></Form.Label>
          <Col  className="primary">
            Success!!
          </Col>
        </Form.Group> */}
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Button type="submit">Create account</Button>
          </Col>
        </Form.Group>
      </div>
    </form>
  );
};

export default SignUp;
