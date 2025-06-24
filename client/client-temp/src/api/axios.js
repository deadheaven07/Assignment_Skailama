import axios from "axios";

/**
 * Axios instance for communicating with the backend API.
 * - Base URL: points to Express server
 * - withCredentials: ensures cookies (JWT) are sent with every request
 */
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

export default api;
