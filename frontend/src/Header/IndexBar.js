import React, { useEffect, useState } from "react";
import { Button, Navbar, Stack, Modal } from "react-bootstrap";
import { auth } from "../Authentication/Firebase";
// import LoginModal from "./LoginModal.js";
import LoginForm from "../Authentication/LoginForm";
import { Link } from "react-router-dom";

export default function IndexBar() {
  const onLogOut = () => {
    auth.signOut();
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts.
    return () => {
      unsubscribe();
    };
  }, []);

  const [showLoginModal, setShowLoginModal] = useState(false);

  if (user) {
    return (
      <Stack direction="horizontal" gap={2}>
        <Navbar.Text>
          <b>{user.email}</b>
        </Navbar.Text>
        <Button className="btn-light" as={Link} to={"/advanced_search"}>
          Search
        </Button>
        <Button className="btn-light" onClick={onLogOut}>
          Log out
        </Button>
        <Button className="btn-light" as={Link} to={`/user/${user.email}`}>
          My Home
        </Button>
        {/* <Button className="btn-secondary" href="/userhome">
          Settings
        </Button> */}
      </Stack>
    );
  } else {
    return (
      <Stack direction="horizontal" gap={3}>
        <Button className="btn-light" href={"/advanced_search"}>
          Search
        </Button>
        <Button
          className="btn-secondary"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </Button>
        {/* login modal */}
        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <LoginForm />
          </Modal.Body>
        </Modal>
      </Stack>
    );
  }
}
