import React, { useState } from "react";
import { Tab, Row, Col, Button, Tabs, Form } from "react-bootstrap";
import Mydisplay from "./Mylistdisplay.js";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../settings";
const MyOwnListsTab = () => {
  const [listName, setName] = useState("");
  const [description, setDesc] = useState("");
  const [newListID, setNewListID] = useState(null);

  //   const creator = JSON.parse(window.localStorage.getItem("login")).email;

  const navigate = useNavigate();

  const createList = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",

      credentials: "omit",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: listName,
        description: description,
      }),
    };
    fetch(`${backendUrl}/user/lists`, request)
      .then((res) => res.json())
      .then((res) => setNewListID(res.data.id))
      .then((res) => navigate("/list/" + newListID))
      .catch((e) => {
        console.log(e);
        alert("Oops! Something Went Wrong, Please Try Again!");
      });
  };
  return (
    <Tabs
      defaultActiveKey="myLists"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="myLists" title="My Lists">
        <Mydisplay />
      </Tab>
      <Tab eventKey="createNewList" title="Create New List">
        <form>
          <Form.Group as={Row} className="mb-3" controlId="listName">
            <Form.Label column sm={2}>
              ListName
            </Form.Label>
            <Col sm={3}>
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
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={3}>
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
        </form>
      </Tab>
    </Tabs>
  );
};

export default MyOwnListsTab;
