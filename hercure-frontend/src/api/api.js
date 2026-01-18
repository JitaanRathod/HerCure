import axios from "axios";

/*
  Central axios instance for HerCure
  - Attaches JWT automatically
  - Used by Cycle, Lifestyle, and future protected APIs
*/

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------- AUTH APIs (existing, untouched) --------
export const loginUser = (data) =>
  api.post("/api/auth/login", data);

export const registerUser = (data) =>
  api.post("/api/auth/register", data);

// -------- DEFAULT EXPORT (IMPORTANT) --------
export default api;
