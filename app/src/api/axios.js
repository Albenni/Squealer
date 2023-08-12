import axios from "axios";
import config from "../config/config.json";

const API_URL = config.API_URL;

export default axios.create({
  baseURL: API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  // headers: {"Content-Type": "application/json"},
  withCredentials: true,
});
