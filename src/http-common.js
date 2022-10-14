import axios from "axios";
export default axios.create({
  baseURL: "https://financial-dashboard-pi.vercel.app/api",
  headers: {
    "Content-type": "application/json",
  },
});
