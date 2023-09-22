import React, { useState, useEffect } from "react";
import { Button, Stack, Navbar } from "react-bootstrap";
import { auth } from "./Firebase";
import LoginModal from "./LoginModal.js";
import { useCookies } from "react-cookie";
import { backendUrl } from "../settings";

export default function LoginIndicator() {
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

  if (user) {
    return (
      <Stack direction="horizontal">
        <Navbar.Text className="me-2">
          Welcome Back:
          <br />
          <b>{user.email}</b>
        </Navbar.Text>
        <Button className="me-2" href={"/advanced_search"}>
          Search
        </Button>
        <Button className="d-flex me-2" onClick={onLogOut}>
          Log out
        </Button>
        <Button className="me-2" href={`/user/${user.email}`}>
          My Home
        </Button>
        <Button variant="outline-secondary" href="/userhome">
          Settings
        </Button>
      </Stack>
    );
  } else {
    return <LoginModal />;
  }
}
