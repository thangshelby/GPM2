import React from 'react'
import { useFinancialDataStore } from "../store/store";
import { footerContent } from "../constant";
import { StockInfomationType } from "../type";
import { format, subMonths } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Bubble, Radar } from "react-chartjs-2";
import { symbol } from 'd3';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);
const RadarOrBubbleChart = () => {
  const labels = ["ACB", "BID", "CTG", "VCB", "MBB", "TCB"];
  let symbol = "acb";
  const data3 = {
    labels: labels,
    datasets: [
      {
        label: "Financial Overview",
        data: [20.12, 17.38, 16.99, 17.02, 19.61, 14.71],
        backgroundColor: labels.map((label) =>
          label === symbol.toUpperCase()
            ? "rgba(255, 99, 132, 0.5)"
            : "rgba(75, 192, 192, 0.2)",
        ),
        borderColor: labels.map((label) =>
          label === symbol.toUpperCase()
            ? "rgba(255, 99, 132, 1)"
            : "rgba(75, 192, 192, 1)",
        ),
        borderWidth: 2,
      },
    ],
  };

  const option3 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}% ROE`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 10,
        suggestedMax: 25,
        pointLabels: {
          font: { size: 14 },
        },
      },
    },
  };
  return (
    <div>
        <Radar data={data3} options={option3} />
    </div>
  )
}

export default RadarOrBubbleChart