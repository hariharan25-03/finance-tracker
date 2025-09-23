import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPortfolios, createPortfolio } from "../services/portfolioService";
import { Link } from "react-router-dom";
import {  Portfolio } from "../types/types";
export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    getPortfolios().then((data) => setPortfolios(data));
  }, []);
  
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("jwtToken");
    navigate("/login");
  };
  const handleCreate = async () => {
    if (!newName) return;
    try {
      const newPortfolio = await createPortfolio({ userId : sessionStorage.getItem("userId"), name: newName });
      setPortfolios([newPortfolio, ...portfolios]);
      setMessage({type: "success", text: `Successfully Created the PortFolio ${newPortfolio.name}`});
    }
    catch (err) {
      setMessage({ type: "error", text: "Failed to add PortFolio. Please try again." });
    }
  };

  return (
   

    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          📊 Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      {message && (
      <div
        className={`mb-4 p-3 rounded border ${
          message.type === "success"
            ? "bg-green-100 text-green-800 border-green-300"
            : "bg-red-100 text-red-800 border-red-300"
        }`}
      >
        {message.text}
      </div>
    )}

      {/* Create Portfolio */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter portfolio name..."
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>

      {/* Portfolio Cards */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        My Portfolios
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {portfolios.map((portfolio: any) => (
          <div
            key={portfolio.portfolioId}
            className="relative group bg-white rounded-xl p-5 shadow hover:shadow-xl transform hover:scale-105 transition duration-200"
          >        

            {/* Card content */}
            <Link to={`/portfolio/${portfolio.portfolioId}`}>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">
                {portfolio.name}
              </h3>
              <p className="text-gray-500 mt-1">
                
                <span className="font-mono text-xs text-gray-400">
                 Add & Manage Invesment
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );



}
