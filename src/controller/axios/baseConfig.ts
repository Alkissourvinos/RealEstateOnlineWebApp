import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  // Optional: add timeout
  timeout: 5000,
  // Optional: add headers
  headers: {
    "Content-Type": "application/json",
  },
});
