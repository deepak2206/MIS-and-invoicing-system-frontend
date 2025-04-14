import axios from "axios";

const BASE_URL = "http://localhost:8085";

export const registerUser = async (userData) => {
  return axios.post(`${BASE_URL}/api/users/register`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${BASE_URL}/api/users/login`, credentials);
};
