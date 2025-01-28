import React from "react";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function VisualizationCard({ title, data, type }) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value),
        backgroundColor: ["#1976d2", "#f50057", "#ff9800", "#4caf50"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h6>{title}</h6>
      {type === "bar" && <Bar data={chartData} options={chartOptions} />}
      {type === "pie" && <Pie data={chartData} options={chartOptions} />}
    </div>
  );
}

export default VisualizationCard;
