import { StockPriceType } from "../type";
import { Line } from "react-chartjs-2";
import { subMonths, format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({
  symbol,
  duration,
  setClosePrice,
}: {
  symbol: string;
  duration: string;
  setClosePrice?: (close: number) => void;
}) => {
  const [stockData, setStockData] = useState<StockPriceType[]>([]);

  useEffect(() => {
    if (!symbol) return; // Tránh fetch khi symbol không hợp lệ

    let startDate =
      duration === "6 Months"
        ? format(subMonths(new Date(), 7), "yyyy-MM-dd")
        : "2020-01-01";
    const endDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/reports/stock?symbol=${symbol}&interval=${duration === "6 Months" ? "1D" : "1W"}&start_date=${startDate}&end_date=${endDate}`,
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setStockData(result);
        if (setClosePrice) setClosePrice(result[result.length - 1].Close);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [symbol, duration]);

  const labels = stockData.map((data) => data.Date);
  const values = stockData.map((data) => data.Close);

  const data = {
    labels,
    datasets: [
      {
        label: `Stock Price of ${symbol} in ${duration}`,
        data: values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        tension: 1,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  // Biến để theo dõi tháng đã hiển thị
  let lastMonth: number | null = null;

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false},
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size:6, // Cỡ chữ
            weight: "bold" as "bold", // Độ đậm
            family: "Arial", // Font chữ
          },
          callback: function (value: any, index: any, values: any) {
            const date = new Date(labels[index]);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            if (duration === "6 Months") {
              // Chỉ hiển thị tháng một lần
              if (lastMonth !== month && month != 7) {
                lastMonth = month;
                return format(new Date(2000, month), "MMMM");
              }
              return null;
            }

            // Hiển thị năm ở cuối năm
            if (month === 11 && day >= 25) {
              return year;
            }
            return null;
          },
        }
      },
      y:{
        ticks:{
          font:{
            size:8,
            weight: "bold" as "bold",
          }
        }
      }
    },
  };

  return (
    <div className="w-full bg-white">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
