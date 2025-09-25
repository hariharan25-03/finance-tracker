import axios from "axios";
const API = "https://finance-tracker-b6l2.onrender.com/api/portfolio";
import { ApiResponse,Portfolio,CreatePortfolioRequest, CreateInvestmentRequest } 
from "../types/types";


export async function getPortfolios(): Promise<Portfolio[]> {
  const userId = sessionStorage.getItem("userId");
  const res = await axios.get<ApiResponse<Portfolio[]>>(
    `${API}/view-user/${encodeURIComponent(userId ?? "")}`
  );
  return res.data.data;
}
export async function createPortfolio(
  payload: CreatePortfolioRequest
): Promise<Portfolio> {
  const res = await axios.post<{ data: Portfolio }>(`${API}/create`, payload);
  return res.data.data; 
}


export async function deletePortfolio (
  id: string
) {
  const res = await axios.delete(`${API}/delete/${encodeURIComponent(id ?? "")}`);
  return res.data;
}



export async function getPortfolioDetail(id: string) {
  const res = await axios.get(`${API}/view/${id}`);
  return res.data.data;
}

export async function getPortfolioInvestments(portfolioId: string) {
  const res = await axios.get(`${API}/view-investments/${portfolioId}`);
  return res.data.data;
}

export async function getAssetDetails() {
  const res = await axios.get(`${API}/view-assets`);
  return res.data.data;
}


export async function createInvestment(payload: CreateInvestmentRequest) {
  const res = await axios.post(
    `${API}/create-investment/${payload.portfolioId}`,
    payload 
  );
  return res.data.data;
}

export async function getPortfolioInsights(portfolioId: string) {
  const res = await axios.get(`${API}/insight/${portfolioId}`);
  return res.data.data;
}

