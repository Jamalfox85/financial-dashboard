import axios from "axios";
export default axios.create({
  baseURL: "https://financial-dashboard-pi.vercel.app",
  headers: {
    "Content-type": "application/json",
  },
});
