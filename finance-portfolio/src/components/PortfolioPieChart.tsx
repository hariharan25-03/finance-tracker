
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Investment } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  investments: Investment[];
}

export default function PortfolioPieChart({ investments }: Props) {
  const labels = investments.map((inv) => inv.assetName);
  const values = investments.map((inv) => inv.units * inv.buyPrice);

  const data = {
    labels,
    datasets: [
      {
        label: "Allocation",
        data: values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Asset Allocation</h2>
      <Pie data={data} />
    </div>
  );
}


