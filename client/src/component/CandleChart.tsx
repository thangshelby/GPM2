// import React, { useEffect, useState } from "react";

// import Chart from "react-apexcharts";
// import Select from "react-select";

// interface StockDataType {
//   name: string;
//   data: { x: Date; y: number[] }[];
// }
// const CandleChart = () => {
//   const [stockData, setStockData] = useState<StockDataType[]>([
//     {
//       name: "sample",
//       data: [
//         { x: new Date("2023-12-25"), y: [900, 920, 890, 910] },
//         { x: new Date("2023-12-26"), y: [910, 930, 905, 925] },
//         { x: new Date("2023-12-27"), y: [925, 940, 920, 935] },
//       ],
//     },
//   ]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://127.0.0.1:5000/stocks/stock_prices");
//       const data = await response.json();
//       const newData: { x: Date; y: number[] }[] = [];
//       for (let i = 0; i < data.length; i++) {
//         const currentData = {
//           x: new Date(data[i]["Date"]),
//           y: [
//             data[i]["Open"],
//             data[i]["High"],
//             data[i]["Low"],
//             data[i]["Close"],
//           ],
//         };
//         newData.push(currentData);
//       }

//       setStockData([...stockData,{ name: "candlestick", data: newData.slice(0, 150) }]);
//     };
//     fetchData();
//   }, []);

//   console.log(stockData);
//   const currentDate = new Date();

//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//   const day = String(currentDate.getDate()).padStart(2, "0");

//   const formattedDate = `${year}-${month}-${day}`;
//   const [selectedStock, setSelectedStock] = useState(stockData[0]);
//   const [chartType, setChartType] = useState("candlestick"); // Loại biểu đồ
//   const [timeframe, setTimeframe] = useState("daily"); // Khoảng thời gian

//   const stockOptions = stockData.map((stock) => ({
//     value: stock.name,
//     label: stock.name,
//   }));

//   const chartOptions = {
//     chart: {
//       type: chartType as
//         | "candlestick"
//         | "line"
//         | "bar"
//         | "area"
//         | "pie"
//         | "donut"
//         | "radialBar"
//         | "scatter"
//         | "bubble"
//         | "heatmap"
//         | "boxPlot"
//         | "radar"
//         | "polarArea"
//         | "rangeBar"
//         | "rangeArea"
//         | "treemap",
//       zoom: { enabled: true },
//     },
//     xaxis: {
//       type: "datetime",
//     },
//     yaxis: {
//       tooltip: {
//         enabled: true,
//       },
//     },
//     tooltip: {
//       shared: true,
//       // custom: ({ seriesIndex, dataPointIndex, w }: any) => {
//       //   const data = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
//       //   const open = data[0];
//       //   const high = data[1];
//       //   const low = data[2];
//       //   const close = data[3];
//       //   return `
//       //       <div>
//       //         <p>O: ${open}</p>
//       //         <p>H: ${high}</p>
//       //         <p>L: ${low}</p>
//       //         <p>C: ${close}</p>
//       //       </div>
//       //     `;
//       // },

//       custom: ({ seriesIndex, dataPointIndex, w }: any) => {
//         const candleData = w.globals.seriesCandleO[0][dataPointIndex];
//         const volume = stockData[selectedStock][dataPointIndex].volume;
//         const [open, high, low, close] = candleData;
//         return `
//           <div>
//             <p><strong>O:</strong> ${open}</p>
//             <p><strong>H:</strong> ${high}</p>
//             <p><strong>L:</strong> ${low}</p>
//             <p><strong>C:</strong> ${close}</p>
//             <p><strong>Volume:</strong> ${volume}</p>
//           </div>
//         `;
//       }
//     },
//   };

//   return (
//     <div className="p-[3.2rem] overflow-y-scroll ">
//       <Select
//         options={stockOptions}
//         defaultValue={stockOptions[0]}
//         onChange={(option) =>
//           setSelectedStock(
//             stockData.find((stock) => stock.name === option?.value) ||
//               stockData[0]
//           )
//         }
//       />

//       {/* Tùy chọn thay đổi loại biểu đồ */}
//       <Select
//         options={[
//           { value: "candlestick", label: "Nến" },
//           { value: "line", label: "Đường" },
//           { value: "bar", label: "Cột" },
//         ]}
//         defaultValue={{ value: "candlestick", label: "Nến" }}
//         onChange={(option) => setChartType(option?.value || "candlestick")}
//       />

//       {/* Tùy chọn thay đổi khung thời gian */}
//       <Select
//         options={[
//           { value: "1m", label: "Phút" },
//           { value: "1h", label: "Giờ" },
//           { value: "daily", label: "Ngày" },
//           { value: "weekly", label: "Tuần" },
//           { value: "monthly", label: "Tháng" },
//         ]}
//         defaultValue={{ value: "daily", label: "Ngày" }}
//         onChange={(option) => setTimeframe(option?.value || "daily")}
//       />

//       <div className="p-[3.2rem]">
//         <div className=" border-[0.1rem] shadow-2xl  border-white rounded-2xl">
//           <div id="chart">
//             {stockData.length ==0 ? (
//               <p>Loading...</p>
//             ) : (
//               <Chart
//                 options={chartOptions}
//                 series={[selectedStock]}
//                 type={chartType}
//                 height={400}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default CandleChart;
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Select from "react-select";

interface StockDataType {
  name: string;
  data: { x: Date; y: number[]; volume: number }[]; // Thêm volume
}

const CandleChart = () => {
  const [stockData, setStockData] = useState<StockDataType[]>([
    {
      name: "sample",
      data: [
        { x: new Date("2023-12-25"), y: [900, 920, 890, 910], volume: 1200 },
        { x: new Date("2023-12-26"), y: [910, 930, 905, 925], volume: 1500 },
        { x: new Date("2023-12-27"), y: [925, 940, 920, 935], volume: 1800 },
      ],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/stocks/stock_prices");
      const data = await response.json();
      const newData: { x: Date; y: number[]; volume: number }[] = [];

      for (let i = 0; i < data.length; i++) {
        const currentData = {
          x: new Date(data[i]["Date"]),
          y: [
            data[i]["Open"],
            data[i]["High"],
            data[i]["Low"],
            data[i]["Close"],
          ],
          volume: data[i]["Volume"], // Thêm volume từ API
        };
        newData.push(currentData);
      }

      setStockData([
        ...stockData,
        { name: "candlestick", data: newData.slice(0, 80) },
      ]);
    };
    fetchData();
  }, []);

  const [selectedStock, setSelectedStock] = useState(stockData[0]);
  const [chartType, setChartType] = useState("candlestick");
  const [timeframe, setTimeframe] = useState("daily");

  const stockOptions = stockData.map((stock) => ({
    value: stock.name,
    label: stock.name,
  }));

  const chartOptions = {
    chart: {
      type: "candlestick",
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: { text: "Price" }, // Trục Y  cho giá
        tooltip: { enabled: true },
      },
      {
        opposite: true,
        title: { text: "Volume" }, // Trục Y cho khối lượng
        labels: { formatter: (val: number) => `${val.toFixed(0)}` },
      },
    ],
    tooltip: {
      shared: true,
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const candleData = w.globals.seriesCandleO[0][dataPointIndex];
        const volume = stockData.find(
          (stock) => stock.name === selectedStock.name
        )?.data[dataPointIndex].volume;
        const [open, high, low, close] = candleData;
        return `
          <div>
            <p><strong>O:</strong> ${open}</p>
            <p><strong>H:</strong> ${high}</p>
            <p><strong>L:</strong> ${low}</p>
            <p><strong>C:</strong> ${close}</p>
            <p><strong>Volume:</strong> ${volume}</p>
          </div>
        `;
      },
    },
  };

  const chartSeries = [
    {
      name: "Price",
      type: "candlestick",
      data: selectedStock.data.map((data) => ({
        x: data.x,
        y: data.y,
      })),
    },
    {
      name: "Volume",
      type: "bar", // Biểu đồ cột
      data: selectedStock.data.map((data) => ({
        x: data.x,
        y: data.volume,
      })),
    },
  ];

  return (
    <div className="p-[3.2rem] overflow-y-scroll ">
      <Select
        options={stockOptions}
        defaultValue={stockOptions[0]}
        onChange={(option) =>
          setSelectedStock(
            stockData.find((stock) => stock.name === option?.value) ||
              stockData[0]
          )
        }
      />

      <div className="p-[3.2rem]">
        <div className=" border-[0.1rem] shadow-2xl  border-white rounded-2xl">
          <div id="chart">
            {stockData.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="line" // Kiểu biểu đồ
                height={400}
              />
            )}
          </div>
        </div>
      </div>

      <div id="html-dist"></div>
    </div>
  );
};

export default CandleChart;
