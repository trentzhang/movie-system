import { Tab, Row, Col, Button, Tabs, Form, Card } from "react-bootstrap";

import MovieCard from "../../List/MovieCard";
import React, { useState } from "react";
import { useNavigate } from "react-dom";
import { backendUrl } from "../../settings";

import { MovieCardGroup } from "../../Home/body/MovieCardGroup";
import { ListCardGroup } from "../../Home/body/ListCardGroup";

const MyMovieListTabs = ({ movies, lists }) => {
  return (
    <Card className="text-dark mb-3">
      <Tabs defaultActiveKey="Liked Movies" className="mb-3">
        <Tab eventKey="Liked Movies" title="Liked Movies">
          {movies ? <MovieCardGroup movies={movies}></MovieCardGroup> : null}
        </Tab>
        <Tab eventKey="Liked Lists" title="Liked Lists" className="mx-3">
          {lists ? <ListCardGroup Lists={lists}></ListCardGroup> : null}
        </Tab>
      </Tabs>
    </Card>
  );
};

export default MyMovieListTabs;

export const NewListForm = () => {
  const [listName, setName] = useState("");
  const [description, setDesc] = useState("");
  const [newListID, setNewListID] = useState(null);

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
      .then(() => navigate("/list/" + newListID))
      .catch((e) => {
        console.log(e);
        alert("Oops! Something Went Wrong, Please Try Again!");
      });
  };
  return (
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
  );
};
