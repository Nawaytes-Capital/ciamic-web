import axios from "axios";

export const apiWithToken = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: "Bearer " + localStorage.getItem("access_token") },
});

export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});
