import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  prices: { date: string; value: number }[];
}

export default function StockPriceChart({ prices }: Props) {
  const data = {
    labels: prices.map((p) => p.date),
    datasets: [
      {
        label: "Price",
        data: prices.map((p) => p.value),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Historical Prices</h2>
      <Line data={data} />
    </div>
  );
}
