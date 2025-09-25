import axios from "axios";

const API = "https://finance-tracker-b6l2.onrender.com/api/auth";

export async function login(email: string, password: string) {
  const res = await axios.post(`${API}/login`, { email, password });
  const { jwtToken, userId } = res.data.data;
  sessionStorage.setItem("jwtToken", jwtToken);
  sessionStorage.setItem("userId", userId);
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  return res.data.data;
}

export async function signup(name: string, email: string, password: string) {
  const res = await axios.post(`${API}/signup`, { name, email, password });
  return res.data;
}


export function isAuthenticated() {
  return !!sessionStorage.getItem("jwtToken"); // true if token exists
}