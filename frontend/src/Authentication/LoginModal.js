import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "./LoginForm";

const LoginModal = ({ setLogin }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="me-2 btn-light" href={"/advanced_search"}>
        Search
      </Button>
      <Button className="btn-secondary" onClick={() => setShow(true)}>
        Login
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginForm setLogin={setLogin} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
