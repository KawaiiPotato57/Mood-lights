import React, { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "/src/api/firebase-config";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./login.css";
import { getUserData } from "../api/mood-service";
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User successfully signed in
      console.log("Success! Welcome back!");

      // Set session persistence (optional)
      await setPersistence(auth, browserSessionPersistence);
      console.log("Persistence set successfully");
      onLoginSuccess();
      // Use useNavigate directly within handleLogin
      const userDataPre = getUserData();
      console.log("in sign in ", userDataPre);
      navigate("/page1");
    } catch (error) {
      console.error("Error occurred:", error);
      setError(error.message); // Set error message for display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="heading">Sign In</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
