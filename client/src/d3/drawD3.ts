import * as d3 from "d3";
import { height, width } from "../constant"
import { StockPriceType } from "../type";


export const createAxix = (chartArea: any, x: any, y: any) => {
  // Axes
  // const xAxis = d3.axisBottom(x).ticks(d3.timeMonth.every(1));
  const xAxis= d3.axisBottom(x) 
  .ticks(d3.timeMonth.every(1))  // Đặt tick theo mỗi tháng
  // .tickFormat((domainValue: any) => d3.timeFormat("%b %Y")(new Date( domainValue).getDate()));
  
  
  const xAxisGroup = chartArea
    .append("g")
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
  parsedData: StockPriceType[],
  candleWidth: number,
  
) => {


    // Volume bars
    chartArea
    .selectAll(".barVolume")
    .data(parsedData)
    .enter()
    .append("rect")
    .attr("class", "barVolume")
    .attr("x", (d: StockPriceType) => {
      return x(d.Date);
    })
    .attr("y", (d: StockPriceType) => height - 50 - d.Volume / 40000)
    .attr("width", candleWidth) // Candle width
    .attr("height", (d: StockPriceType) => d.Volume / 40000)

    .attr("fill", (d: StockPriceType) =>
      d.Open < d.Close ? "#7fbf7f" : "#ff7f7f  "
    );


  // Candle
  chartArea
    .selectAll(".candle")
    .data(parsedData)
    .enter()
    .append("rect")
    .attr("class", "candle")
    .attr("x", (d:StockPriceType) => {
      return x(d.Date)
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

  // Wicks
  chartArea
    .selectAll(".wick")
    .data(parsedData)
    .enter()
    .append("line")
    .attr("class", "wick")
    .attr("x1", (d: StockPriceType) => x(d.Date)+candleWidth/2)
    .attr("x2", (d: StockPriceType) => x(d.Date)+candleWidth/2)
    .attr("y1", (d: StockPriceType) => y(d.High))
    .attr("y2", (d: StockPriceType) => y(d.Low))
    .attr("stroke", (d: StockPriceType) =>
      d.Open < d.Close ? "#30cc5a" : "#f63538"
    )
    .attr("stroke-width", 1);


};

