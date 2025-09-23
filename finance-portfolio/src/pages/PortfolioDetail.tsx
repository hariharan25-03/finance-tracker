import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import {
  getPortfolioDetail, getPortfolioInsights,
  getPortfolioInvestments, createInvestment, getAssetDetails
} from "../services/portfolioService";
import PortfolioPieChart from "../components/PortfolioPieChart"; // adjust the path
import { CreateInvestmentRequest, Asset, Investment, PortfolioInsight, Portfolio } from "../types/types";

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [insight, setInsight] = useState<PortfolioInsight | null>(null);
  const [tab, setTab] = useState<"assets" | "investments" | "insights">("assets");
  const [quantityMap, setQuantityMap] = useState<Record<string, number>>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!id) return;

    getPortfolioDetail(id).then((pf) => {
      setPortfolio(pf);
      getPortfolioInvestments(pf.portfolioId).then(setInvestments);
    });

    getAssetDetails().then(setAssets);
  }, [id]);

  useEffect(() => {
    if (tab === "insights" && portfolio) {
      getPortfolioInsights(portfolio.portfolioId).then(setInsight);
    }
  }, [tab, portfolio]);

  if (!portfolio) return <p className="p-6">Loading...</p>;

  const handleQuantityChange = (assetId: string, value: number) => {
    setQuantityMap((prev) => ({ ...prev, [assetId]: value }));
  };

  const handleInvest = async (asset: Asset) => {
    const units = quantityMap[asset.assetId];
    if (!units || units <= 0) return alert("Enter a valid units");

    const payload: CreateInvestmentRequest = {
      portfolioId: portfolio.portfolioId,
      assetId: asset.assetId,
      units,
      buyPrice: asset.currentPrice,
      currency: asset.currency,
      purchaseDate: new Date().toISOString(),
    };

    try {
      const newInvestment = await createInvestment(payload);
      setInvestments((prev) => [newInvestment, ...prev]);
      setQuantityMap((prev) => ({ ...prev, [asset.assetId]: 0 }));
      setMessage({type: "success", text: `Successfully invested in ${asset.name}`});
    } catch (err) {
      setMessage({ type: "error", text: "Failed to add investment. Please try again." });
    }
  };






  return (
    <div className="p-6">
    <BackButton />
    <h1 className="text-2xl font-bold mb-4">{portfolio.name}</h1>

    
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

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        <button
          className={`pb-2 ${tab === "assets" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setTab("assets")}
        >
          Assets
        </button>
        <button
          className={`pb-2 ${tab === "investments" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setTab("investments")}
        >
          Investments
        </button>
        <button
          className={`pb-2 ${tab === "insights" ? "border-b-2 border-purple-600 font-semibold" : ""}`}
          onClick={() => setTab("insights")}
        >
          Insights
        </button>
      </div>

      {/* Assets Tab */}
      {tab === "assets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((a) => (
            <div key={a.assetId} className="border rounded-lg p-4 shadow-sm bg-white">
              <h2 className="font-bold text-lg mb-1">
                {a.name} ({a.tickerSymbol})
              </h2>
              <p className="text-sm text-gray-500 mb-2">{a.assetType}</p>
              <p><span className="font-semibold">OverAll Units Invested in this Asset:</span> {a.units}</p>
              <p><span className="font-semibold">Current Price:</span> {a.currentPrice} {a.currency}</p>
              <p><span className="font-semibold">Current Value:</span> {a.currentValue} {a.currency}</p>
              <p className="text-xs text-gray-400 mt-2">
                Last Updated: {new Date(a.lastUpdated).toLocaleString()}
              </p>

              {/* Investment form */}
              <div className="mt-4 flex gap-2 items-center">
                <input
                  type="number"
                  min={0}
                  placeholder="Quantity"
                  className="border p-2 rounded flex-1"
                  value={quantityMap[a.assetId] || ""}
                  onChange={(e) => handleQuantityChange(a.assetId, parseFloat(e.target.value))}
                />
                <button
                  onClick={() => handleInvest(a)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Invest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Investments Tab */}
      {tab === "investments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {investments.map((i) => (
            <div
              key={i.investmentId}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg mb-1">{i.assetName}</h2>
              <p className="text-sm text-gray-500 mb-2">{i.currency}</p>

              <p>
                <span className="font-semibold">Buyed Units:</span> {i.units}
              </p>
              <p>
                <span className="font-semibold">Buy Price:</span> {i.buyPrice} {i.currency}
              </p>
              <p>
                <span className="font-semibold">Amount Invested:</span> {i.amountInvested} {i.currency}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Purchased: {new Date(i.purchaseDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}



      {/* Insights Tab */}
      {tab === "insights" && (
        <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-700">📊 Portfolio Insights</h2>
          {insight ? (
            <div>
              <p className="text-lg mb-2">
                <span className="font-semibold">Diversification Score:</span>{" "}
                <span className="text-indigo-700">{insight.diversificationScore} / 100</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Recommendation:</span>{" "}
                {insight.assets.map((a) => a.name).join(", ")}
              </p>
              <p className="text-gray-600 italic">"{insight.recommendation}"</p>
            </div>
          ) : (
            <p className="text-gray-500">Fetching insights...</p>
          )}
             {investments.length > 0 && (
            <div className="my-6">
              <PortfolioPieChart investments={investments} />
            </div>
          )}
        
        </div>
        
      )}

    </div>
  );

}

