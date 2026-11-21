const rawUrl = process.env.REACT_APP_API_URL || "";
const API_BASE_URL = rawUrl.trim().replace(/\/+$/, "");

if (!API_BASE_URL) {
  console.error("[API Config] Error: REACT_APP_API_URL is not set in environment variables!");
} else {
  console.log("[API Config] Active API Base URL:", API_BASE_URL);
}

export default API_BASE_URL;
