const rawUrl = process.env.REACT_APP_API_URL || "https://cothon-task1-backend.onrender.com";
const API_BASE_URL = rawUrl.trim().replace(/\/+$/, "");

console.log("[API Config] Active API Base URL:", API_BASE_URL);

export default API_BASE_URL;
