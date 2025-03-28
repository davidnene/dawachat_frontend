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
        backgroundColor: ["#1565c0", "#0d47a1", "#42a5f5", "#d3d3d3"]
        ,
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
