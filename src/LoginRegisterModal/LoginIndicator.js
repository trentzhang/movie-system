import React, { useState, useEffect } from "react";
import { Button, Stack, Navbar } from "react-bootstrap";

import LoginModal from "./LoginModal.js";
import { useCookies } from "react-cookie";

const LoginIndicator = () => {
  const [login, setLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const tmp = window.localStorage.getItem("login");
    if (tmp) {
      // convert string "false" to boolean false
      setLogin(JSON.parse(tmp));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("login", Boolean(login));
  }, [login]);

  const onLogOut = () => {
    const request = {
      method: "POST",
      mode: "cors",
      credentials: "omit",
    };
    fetch("${backendUrl}/auth/user/logout", request);
    //   clean cookies
    removeCookie("email");
    removeCookie("accessToken");
    //   set login status
    setLogin(false);
    window.location.reload(false);
  };

  if (!login) {
    return <LoginModal setLogin={(login_value) => setLogin(login_value)} />;
  } else {
    return (
      <Stack direction="horizontal">
        <Navbar.Text className="me-2">
          Welcome Back:
          <br />
          <b>{cookies.email}</b>
        </Navbar.Text>

        <Button className="me-2" href={"/advanced_search"}>
          Search
        </Button>
        <Button
          //   variant="outline-success"
          className="d-flex me-2"
          onClick={onLogOut}
        >
          Log out
        </Button>
        <Button className="me-2" href={`/user/${cookies.email}`}>
          My Home
        </Button>
        <Button variant="outline-secondary" href="/userhome">
          Settings
        </Button>
      </Stack>
    );
  }
};
export default LoginIndicator;
