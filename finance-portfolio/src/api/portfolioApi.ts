import axios from "axios";

const API_BASE = "http://localhost:8080/auth"; // update this

export const api = axios.create({
  baseURL: API_BASE,
});

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  const { token, user } = res.data;
  sessionStorage.setItem("token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return user;
}

export async function signup(name: string, email: string, password: string) {
  const res = await api.post("/auth/signup", { name, email, password });
  return res.data;
}

export async function getPortfolios() {
  const res = await api.get("/portfolios");
  return res.data;
}

export async function createPortfolio(name: string) {
  const res = await api.post("/portfolios", { name });
  return res.data;
}

export async function getPortfolioDetail(id: string) {
  const res = await api.get(`/portfolios/${id}`);
  return res.data;
}
