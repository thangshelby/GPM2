import * as d3 from "d3";
import { StockPriceType } from "../type";
type parsedDataType = StockPriceType & { date: Date };

const width = 1200;
const height = 400;

export const createAxix = (chartArea: any, x: any, y: any) => {
  // Axes
  const xAxis = d3.axisBottom(x).ticks(d3.timeMonth.every(1));

  const xAxisGroup = chartArea
    .append("g")
    .attr("transform", `translate(0,0)`)
    .call(xAxis);
  xAxisGroup.selectAll("path, line").remove();
  xAxisGroup
    .selectAll("text")
    .style("fill", "#616a7a") // X-axis text color
    .style("font-size", "8px")
    .style("font-weight", "bold")
    .style("transform", `translateY(${height - 40}px)`);

  const yAxis = d3.axisRight(y);

  const yAxisGroup = chartArea.append("g").call(yAxis);
  yAxisGroup.selectAll("path, line").remove();

  yAxisGroup
    .selectAll("text")
    .style("fill", "#616a7a") // Y-axis text color
    .style("font-size", "8px")
    .style("font-weight", "bold")
    .style("transform", `translateX(${width - 80}px)`);
  // Style x-axis and y-axis lines
  chartArea.selectAll(".x-axis path, .x-axis line").style("stroke", "#616a7a"); // X-axis color
  chartArea.selectAll(".y-axis path, .y-axis line").style("stroke", "#616a7a"); // Y-axis color
};

//Create Candlestick Chart
export const createCandlestickChart = (
  chartArea: any,
  x: any,
  y: any,
  parsedData: parsedDataType[],
  candleWidth: number
) => {
  chartArea
    .selectAll(".candle")
    .data(parsedData)
    .enter()
    .append("rect")
    .attr("class", "candle")
    .attr("x", (d: { date: Date }) => {
      return x(d.date) - candleWidth / 2;
    })
    .attr("y", (d: { date: Date; Open: number; Close: number }) =>
      y(Math.max(d.Open, d.Close))
    )
    .attr("width", candleWidth)
    .attr("height", (d: { date: Date; Open: number; Close: number }) => {
      const height =
        y(Math.min(d.Open, d.Close)) - y(Math.max(d.Open, d.Close));

      return height;
    })
    .attr("fill", (d: { date: Date; Open: number; Close: number }) =>
      d.Open < d.Close ? "#30cc5a" : "#f63538"
    );

  chartArea
    .selectAll(".wick")
    .data(parsedData)
    .enter()
    .append("line")
    .attr("class", "wick")
    .attr("x1", (d: parsedDataType) => x(d.date))
    .attr("x2", (d: parsedDataType) => x(d.date))
    .attr("y1", (d: parsedDataType) => y(d.High))
    .attr("y2", (d: parsedDataType) => y(d.Low))
    .attr("stroke", (d: parsedDataType) =>
      d.Open < d.Close ? "#30cc5a" : "#f63538"
    )
    .attr("stroke-width", 1);
  chartArea
    .selectAll(".barVolume")
    .data(parsedData)
    .enter()
    .append("rect")
    .attr("class", "barVolume")
    .attr("x", (d: { date: Date }) => {
      return x(d.date) - candleWidth / 2;
    })
    .attr("y", (d: parsedDataType) => height - 50 - d.Volume / 20000)
    .attr("width", candleWidth) // Candle width
    .attr("height", (d: parsedDataType) => d.Volume / 20000)

    .attr("fill", (d: parsedDataType) =>
      d.Open < d.Close ? "#7fbf7f" : "#ff7f7f  "
    );
};

