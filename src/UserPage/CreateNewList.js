import React, { useState } from "react";
import { Tab, Row, Col, Nav, Button, Stack, Tabs, Form } from "react-bootstrap";
import { MDBCol, MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";

import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";

function CreateNewList(props) {
  let { email } = useParams();
  const [cookies] = useCookies();
  console.log(email, cookies.email);
  if (
    JSON.parse(window.localStorage.getItem("login")) &&
    email === cookies.email
  ) {
    // login email is path email
    return <NewListForm />;
  } else {
    return <></>;
  }
}

export default CreateNewList;

const NewListForm = () => {
  const [listName, setName] = useState("");
  const [description, setDesc] = useState("");
  const [newListID, setNewListID] = useState(null);
  const [cookies] = useCookies();

  const navigate = useNavigate();

  const createList = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      mode: "cors",
      credentials: "omit",

      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        cookies: `email=${cookies.email};accessToken=${cookies.accessToken}`,
      },

      body: JSON.stringify({
        name: listName,
        description: description,
      }),
    };
    fetch("${backendUrl}/user/lists", request)
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
};
