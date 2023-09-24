import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { MDBCard } from "mdb-react-ui-kit";
import { backendUrl } from "../settings";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";

export default function CreateNewList() {
  const [listName, setName] = useState("");
  const [description, setDesc] = useState("");
  const [newListID, setNewListID] = useState(null);

  const navigate = useNavigate();

  const createList = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: listName,
        description: description,
      }),
    };
    fetch(`${backendUrl}/user/lists`, request)
      .then((res) => res.json())
      .then((res) => setNewListID(res.data.id))
      .then(() => navigate("/list/" + newListID))
      .catch((e) => {
        console.log(e);
        alert("Oops! Something Went Wrong, Please Try Again!");
      });
  };
  return (
    <MDBCard className="p-4">
      <Form.Label>Create List</Form.Label>
      <hr />
      <Form.Group as={Row} className="mb-3" controlId="listName">
        <Form.Label column sm={4}>
          ListName
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            required
            type="text"
            placeholder="ListName"
            value={listName}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="desc">
        <Form.Label column sm={4}>
          Description
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="createbutton">
        <Col sm={9}>
          {/* <Button type="submit"> */}
          <Button type="submit" onClick={createList}>
            Create
          </Button>
        </Col>
      </Form.Group>
    </MDBCard>
  );
}
