import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;