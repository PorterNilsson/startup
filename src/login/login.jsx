import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login({ setUser }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ email: username, password: password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response?.status === 200) {
        localStorage.setItem("username", username);
        setUser(username);
        navigate("/home");
      } else {
        const body = await response.json();
        setError(`⚠ Error: ${body.msg}`);
      }
    } catch (error) {
      setError("⚠ Error: Something went wrong!");
    }
  }

  function loginUser() {
    if (username !== "" && password !== "") {
      loginOrCreate('/api/auth/login');
    } else {
      setError(true);
    }
  }

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function passwordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <main>
      <div className="login-box">
        <h3 className="title">Sign in to Devotee</h3>
        <div className="previous-form">
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="your@email.com"
              onChange={usernameChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={passwordChange}
            />
          </div>
          {error && (
            <span className="error">
              You must enter a username and password!
            </span>
          )}
          <button
            type="submit"
            className="login-button button"
            onClick={loginUser}
          >
            Login
          </button>
          <button type="submit" className="button" onClick={loginUser}>
            Create New User
          </button>
        </div>
      </div>
    </main>
  );
}
