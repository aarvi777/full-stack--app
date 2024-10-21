import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Hook to redirect

  const login = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await axios.post("http://localhost/api/login.php", user);
      if (response.data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user to localStorage
        setLoggedIn(true);  // Update login state
        navigate("/dashboard");  // Redirect to dashboard after login
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <h4>Sign In</h4>
      <form onSubmit={login} className="form-control">
        <div className="mb-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default Login;
