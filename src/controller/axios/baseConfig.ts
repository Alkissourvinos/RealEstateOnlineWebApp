import axios from "axios";

// Create axios instance with default config
export const api = axios.create({
  baseURL: "http://localhost:8080/api/", // Base path for all requests
  timeout: 5000, // Request timeout in ms
  headers: {
    "Content-Type": "application/json", // Set default content type header
  },
});
