import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setMsg("");

    let valid = true;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // ✅ EMAIL VALIDATION
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Enter valid email");
      valid = false;
    }

    // ✅ PASSWORD VALIDATION
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await loginUser({ email, password });

      // 🔐 SAFE CHECK (important fix)
      if (!res?.data?.token) {
        setMsg("Invalid response from server");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ SAVE USER INFO
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
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
        <h2 className="mb-3 text-center">Login</h2>

        <p className="text-center fw-semibold mb-3">{msg}</p>

        {/* EMAIL */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-1"
        />
        <p className="text-danger small">{emailError}</p>

        {/* PASSWORD */}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-1"
        />
        <p className="text-danger small">{passwordError}</p>

        {/* SUBMIT */}
        <input
          type="submit"
          value="Login"
          className="btn btn-dark w-100 mt-3"
        />

        <p className="create-account mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/Signup">Create account</Link>
        </p>
      </form>
    </>
  );
}

export default Login;