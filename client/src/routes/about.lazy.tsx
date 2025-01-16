import { createLazyFileRoute } from "@tanstack/react-router";

import React, { useState } from "react";
import Chart from "react-apexcharts";
import Select from "react-select";

export const Route = createLazyFileRoute("/about")({
  component: App,
});


function App  () {
  // Trạng thái hiện tại
  const [selectedStock, setSelectedStock] = useState(stockData[0]);
  const [chartType, setChartType] = useState("candlestick"); // Loại biểu đồ
  const [timeframe, setTimeframe] = useState("daily"); // Khoảng thời gian

  const stockOptions = stockData.map((stock) => ({
    value: stock.name,
    label: stock.name,
  }));

  const chartOptions = {
    chart: {
      type: chartType,
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      shared: true,
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const data = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const open = data[0];
        const high = data[1];
        const low = data[2];
        const close = data[3];
        return `
          <div>
            <p>O: ${open}</p>
            <p>H: ${high}</p>
            <p>L: ${low}</p>
            <p>C: ${close}</p>
          </div>
        `;
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Thanh tìm kiếm mã cổ phiếu */}
      <Select
        options={stockOptions}
        defaultValue={stockOptions[0]}
        onChange={(option) =>
          setSelectedStock(
            stockData.find((stock) => stock.name === option?.value) || stockData[0]
          )
        }
      />

      {/* Tùy chọn thay đổi loại biểu đồ */}
      <Select
        options={[
          { value: "candlestick", label: "Nến" },
          { value: "line", label: "Đường" },
          { value: "bar", label: "Cột" },
        ]}
        defaultValue={{ value: "candlestick", label: "Nến" }}
        onChange={(option) => setChartType(option?.value || "candlestick")}
      />

      {/* Tùy chọn thay đổi khung thời gian */}
      <Select
        options={[
          { value: "1m", label: "Phút" },
          { value: "1h", label: "Giờ" },
          { value: "daily", label: "Ngày" },
          { value: "weekly", label: "Tuần" },
          { value: "monthly", label: "Tháng" },
        ]}
        defaultValue={{ value: "daily", label: "Ngày" }}
        onChange={(option) => setTimeframe(option?.value || "daily")}
      />

      {/* Biểu đồ nến */}
      <Chart
        options={chartOptions}
        series={[selectedStock]}
        type={chartType}
        height={400}
      />

      {/* Dữ liệu dưới biểu đồ */}
      <div style={{ marginTop: "20px" }}>
        <h3>Các lệnh giao dịch</h3>
        <p>(Dữ liệu hiển thị các lệnh đang xử lý hoặc lịch sử giao dịch)</p>
      </div>
    </div>
  );
};

const stockData = [
  {
    name: "HPG",
    data: [
      { x: new Date("2023-12-25"), y: [100, 105, 95, 102] },
      { x: new Date("2023-12-26"), y: [102, 110, 101, 108] },
      { x: new Date("2023-12-27"), y: [108, 112, 106, 110] },
    ],
  },
  {
    name: "VNINDEX",
    data: [
      { x: new Date("2023-12-25"), y: [900, 920, 890, 910] },
      { x: new Date("2023-12-26"), y: [910, 930, 905, 925] },
      { x: new Date("2023-12-27"), y: [925, 940, 920, 935] },
    ],
  },
];