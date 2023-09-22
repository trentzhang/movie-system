import React, { useState, useEffect } from "react";
import { Button, Stack, Navbar } from "react-bootstrap";
import { auth } from "./Firebase";
import LoginModal from "./LoginModal.js";
import { useCookies } from "react-cookie";
import { backendUrl } from "../settings";

export default function LoginIndicator() {
  //   const [login, setLogin] = useState(false);

  //   const [cookies, removeCookie] = useCookies();

  //   useEffect(() => {
  //     const tmp = window.localStorage.getItem("login");
  //     if (tmp) {
  //       // convert string "false" to boolean false
  //       setLogin(JSON.parse(tmp));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     window.localStorage.setItem("login", Boolean(login));
  //   }, [login]);

  const onLogOut = () => {
    // const request = {
    //   method: "POST",
    //   credentials: "omit",
    // };
    // fetch(`${backendUrl}/auth/user/logout`, request);
    // //   clean cookies
    // removeCookie("email");
    // removeCookie("accessToken");
    // //   set login status
    // setLogin(false);
    // window.location.reload(false);
  };

  let Results = <LoginModal />;

  //   auth.onAuthStateChanged(function (user) {
  //     if (user) {
  //       // User is not signed in or token was not refreshed.
  //       Results = (
  //         <Stack direction="horizontal">
  //           <Navbar.Text className="me-2">
  //             Welcome Back:
  //             <br />
  //             <b>{cookies.email}</b>
  //           </Navbar.Text>

  //           <Button className="me-2" href={"/advanced_search"}>
  //             Search
  //           </Button>
  //           <Button
  //             //   variant="outline-success"
  //             className="d-flex me-2"
  //             onClick={onLogOut}
  //           >
  //             Log out
  //           </Button>
  //           <Button className="me-2" href={`/user/${cookies.email}`}>
  //             My Home
  //           </Button>
  //           <Button variant="outline-secondary" href="/userhome">
  //             Settings
  //           </Button>
  //         </Stack>
  //       );
  //     }
  //   });
  //   if (!auth.currentUser) {
  //     return <LoginModal setLogin={(login_value) => setLogin(login_value)} />;
  //   } else {
  //     return (
  //       <Stack direction="horizontal">
  //         <Navbar.Text className="me-2">
  //           Welcome Back:
  //           <br />
  //           <b>{cookies.email}</b>
  //         </Navbar.Text>

  //         <Button className="me-2" href={"/advanced_search"}>
  //           Search
  //         </Button>
  //         <Button
  //           //   variant="outline-success"
  //           className="d-flex me-2"
  //           onClick={onLogOut}
  //         >
  //           Log out
  //         </Button>
  //         <Button className="me-2" href={`/user/${cookies.email}`}>
  //           My Home
  //         </Button>
  //         <Button variant="outline-secondary" href="/userhome">
  //           Settings
  //         </Button>
  //       </Stack>
  //     );
  //   }

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        console.log("authUser :>> ", authUser);
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
        <Button
          //   variant="outline-success"
          className="d-flex me-2"
          onClick={onLogOut}
        >
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
