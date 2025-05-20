"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data, options }) {
  const chartData = useMemo(() => {
    return {
      labels: data.labels,
      datasets: data.datasets,
    };
  }, [data]);

  return <Bar data={chartData} options={options} />;
}
