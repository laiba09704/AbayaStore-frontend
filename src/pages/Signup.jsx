import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { signupUser } from "../api/auth";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setMsg("");

    let valid = true;

    if (name.trim() === "") {
      setNameError("Name is required");
      valid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Enter valid email");
      valid = false;
    }

    if (password === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await signupUser({ name, email, password });

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <form
        id="loginForm"
        onSubmit={handleSubmit}
        className="container mt-5"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-3 text-center">Create Account</h2>

        <p className="text-center fw-semibold mb-3">{msg}</p>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-1"
        />
        <p className="text-danger small">{nameError}</p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-1"
        />
        <p className="text-danger small">{emailError}</p>

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-1"
        />
        <p className="text-danger small">{passwordError}</p>

        <input
          type="submit"
          value="Sign Up"
          className="btn btn-dark w-100 mt-3"
        />

        <p className="create-account mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}

export default Signup;