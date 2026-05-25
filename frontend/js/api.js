// frontend/js/api.js
// Centralized API base URL configuration
// Adjust based on environment (development vs production)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api";

export default API_BASE_URL;
