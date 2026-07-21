import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommercewebsite-kt1z.onrender.com/api",
});

export default API;