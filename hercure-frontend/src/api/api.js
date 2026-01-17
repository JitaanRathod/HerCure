import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (userData) => {
  return API.post("/api/auth/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/api/auth/login", userData);
};
