import axios from "axios";
const API = (import.meta.env.VITE_API_URL as string)
const instance = axios.create({
  baseURL: `${API}/v1`,
  // baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;