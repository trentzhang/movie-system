import React, { useState } from "react";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User is logged in
      console.log("userCredential.user :>> ", userCredential.user);
      if (userCredential.user.emailVerified) {
        alert(`Logged in`);
        // console.log("auth.currentUser :>> ", auth.currentUser);
      } else {
        auth.signOut();
      }
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      console.log("auth.currentUser :>> ", auth.currentUser);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
