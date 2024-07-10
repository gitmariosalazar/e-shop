"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GraphData[];
}

type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  console.log(data);
  const labels = data.map((item) => item.day);
  const amounts = data.map((item) => item.totalAmount);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sale Amount",
        data: amounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Color de fondo
        borderColor: "rgba(54, 162, 235, 1)", // Color del borde
        borderWidth: 2,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(255, 0, 141, 0.9)", // Color de las líneas de la cuadrícula del eje Y
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)", // Color de las etiquetas del eje Y
        },
      },
      x: {
        grid: {
          display: true,
          color: "rgba(255, 0, 141, 0.9)", // Color de las líneas de la cuadrícula del eje X
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)", // Color de las etiquetas del eje X
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.7)", // Color del texto de la leyenda
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Color de fondo del tooltip
        titleColor: "rgba(255, 255, 255, 1)", // Color del título del tooltip
        bodyColor: "rgba(255, 255, 255, 1)", // Color del texto del tooltip
        borderColor: "rgba(255, 255, 255, 0.5)", // Color del borde del tooltip
        borderWidth: 1,
      },
    },
  };
  return <Bar data={chartData} options={options} />;
};

export default BarGraph;
