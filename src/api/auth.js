import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

// SIGNUP
export const signupUser = (data) => API.post("/signup", data);

// LOGIN
export const loginUser = (data) => API.post("/login", data);