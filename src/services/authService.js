import http from "./httpService";
import config from "../utils/config.json";
import jwt_decode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
}

const authService = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default authService;
