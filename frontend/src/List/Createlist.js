import React, { useState } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

function Createlist() {
  // const [lid] = useState(x);
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const [listname, setName] = useState("");
  const [description, setDesc] = useState("");
  const creator = JSON.parse(window.localStorage.getItem("login")).email;
  const createlist = () => {
    const request = {
      method: "POST",
      
      credentials: "omit",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user: creator,
        list_name: listname,
        description: description,
      }),
    };
    fetch(`${backendUrl}/create_list", request);
  };
  return (
    <>
      <form>
        <Form.Group as={Row} className="mb-3" controlId="listname">
          <Form.Label column sm={3}>
            ListName
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              required
              type="text"
              placeholder="Listname"
              value={listname}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="desc">
          <Form.Label column sm={3}>
            Description
          </Form.Label>
          <Col sm={9}>
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
            <Button type="submit" onClick={createlist}>
              Create
            </Button>
          </Col>
        </Form.Group>
      </form>
    </>
  );
}
export default Createlist;
