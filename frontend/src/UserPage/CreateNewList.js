import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { MDBCard } from "mdb-react-ui-kit";
import { backendUrl } from "../settings";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { auth } from "../Authentication/Firebase";

export default function CreateNewList() {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [newListID, setNewListID] = useState(null);

  const navigate = useNavigate();

  const createList = async (e) => {
    if (!auth.currentUser) {
      alert("Please log in first!");
      return null;
    }

    e.preventDefault();
    try {
      const request = {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          listName: listName,
          description: description,
          creator: auth.currentUser.email,
        }),
      };

      const response = await fetch(`${backendUrl}/lists`, request);
      const data = await response.json();
      const newListId = data.data.id;

      setNewListID(newListId);
      navigate("/list/" + newListId);
    } catch (error) {
      console.log(error);
      alert("Oops! Something Went Wrong, Please Try Again!");
    }
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
            onChange={(e) => setListName(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
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
