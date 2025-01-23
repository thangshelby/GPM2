import * as d3 from "d3";
import { StockPriceType } from "../../type";
import { height } from "../../constant";
export const createCandlestickChart = (
    x: any,
    y: any,
    parsedData: StockPriceType[],
    candleWidth: number,
  ) => {
    const chartArea = d3.select(".chart-area");
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
      .attr("y", (d: StockPriceType) => height - 50 - d.Volume / 100000)
      .attr("width", candleWidth) // Candle width
      .attr("height", (d: StockPriceType) => d.Volume / 100000)
  
      .attr("fill", (d: StockPriceType) =>
        d.Open < d.Close ? "#7fbf7f" : "#ff7f7f  ",
      );
  
    // Candle
    chartArea
      .selectAll(".candle")
      .data(parsedData)
      .enter()
      .append("rect")
      .attr("class", "candle")
      .attr("x", (d: StockPriceType) => {
        return x(d.Date);
      })
      .attr("y", (d: StockPriceType) => y(Math.max(d.Open, d.Close)))
      .attr("width", candleWidth)
      .attr("height", (d: StockPriceType) => {
        const height =
          y(Math.min(d.Open, d.Close)) - y(Math.max(d.Open, d.Close));
  
        return height;
      })
      .attr("fill", (d: StockPriceType) =>
        d.Open < d.Close ? "#30cc5a" : "#f63538",
      );
  
    // Wicks
    chartArea
      .selectAll(".wick")
      .data(parsedData)
      .enter()
      .append("line")
      .attr("class", "wick")
      .attr("x1", (d: StockPriceType) => x(d.Date) + candleWidth / 2)
      .attr("x2", (d: StockPriceType) => x(d.Date) + candleWidth / 2)
      .attr("y1", (d: StockPriceType) => y(d.High))
      .attr("y2", (d: StockPriceType) => y(d.Low))
      .attr("stroke", (d: StockPriceType) =>
        d.Open < d.Close ? "#30cc5a" : "#f63538",
      )
      .attr("stroke-width", 1);
  };

  export const deleteCandlestickChart = () => {
    const chartArea = d3.select(".chart-area");
    chartArea.selectAll(".candle").remove();
    chartArea.selectAll(".wick").remove();
    // chartArea.selectAll(".barVolume").remove();
  }