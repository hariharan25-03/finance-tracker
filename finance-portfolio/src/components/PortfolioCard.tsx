import { Link } from "react-router-dom";

export default function PortfolioCard({ portfolio }: { portfolio: any }) {
  return (
    <Link to={`/portfolio/${portfolio.id}`}>
      <div className="p-4 shadow rounded bg-white hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{portfolio.name}</h2>
        <p className="text-gray-500">Value: {portfolio.totalValue || 0}</p>
      </div>
    </Link>
  );
}
