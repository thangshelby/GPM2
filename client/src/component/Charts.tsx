import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { StockPriceType } from "../type";
import { createAxix, drawVerticalAndHorizontalLine } from "../d3/drawD3";
import {
  createCandlestickChart,
  deleteCandlestickChart,
} from "../d3/draw/CandleStickChart";
import { createLineChart, deleteLineChart } from "../d3/draw/LineChart";
import { createBarChart, deleteBarChart } from "../d3/draw/Barchart";
import {
  addMouseEvents,
  // addZoomBehavior,
  addDragBehavior,
} from "../d3/eventD3";
import { width, height } from "../constant";
import addSMALine from "../d3/indicators/SMALine";
import addBBLine from "../d3/indicators/BBLine";
import addMFILine from "../d3/indicators/MFILine";
import addMACDLine from "../d3/indicators/MACDLine";
import addRSILine from "../d3/indicators/RSILine";
import addSMA50Line from "../d3/indicators/SMA50";
import addSMA20Line from "../d3/indicators/SMA20Line";

import { useVisibleIndicatorsStore, usexOriginStore } from "../store/store";

const Charts: React.FC<{
  data: StockPriceType[];
  selectedChart: number;
  ric: string;
}> = React.memo(({ data, selectedChart, ric }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const xRef = useRef<d3.ScaleBand<string> | null>(null);
  const yRef = useRef<d3.ScaleBand<string> | null>(null);
  const [candleWidth, setCandleWidth] = useState(5);

  const { visibleIndicators } = useVisibleIndicatorsStore();
  const { xOrigin, setXOrigin } = usexOriginStore();

  const [stockPrices, setStockPrices] = useState<{
    Date: string;
    Open: number;
    Close: number;
    High: number;
    Low: number;
  }>(data[0]);

  // Create x and y axes

  let x: any = null;
  let y: any = null;
  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("class", "chart");
    // Chart area

    const chartArea = svg
      .append("g")
      .attr("class", "chart-area")
      .attr("width", width)
      .attr("height", height);
    // X and Y scales
    x = d3
      .scaleBand()
      .domain(data.map((d) => d.Date))
      .range([-(data.length - 112) * candleWidth, width - 80])
      .padding(0);

    xRef.current = x;

    const xRanges = data.reduce(
      (
        acc: {
          [key: string]: {
            xStart: number | undefined;
            xEnd: number | undefined;
          };
        },
        d,
      ) => {
        const xStart = x(d.Date);
        const xEnd = xStart! + x.bandwidth();
        acc[d.Date] = { xStart, xEnd }; // Lưu phạm vi xStart và xEnd cho mỗi giá trị
        return acc;
      },
      {},
    );

    const min1 = d3.min(data, (d) => d.Low) ?? 0;
    const min2 = d3.min(data, (d) => d.Open) ?? 0;
    const min3 = d3.min(data, (d) => d.Close) ?? 0;
    const min = d3.min([min1, min2, min3]) ?? 0;

    const max1 = d3.max(data, (d) => d.High) ?? 0;
    const max2 = d3.max(data, (d) => d.Open) ?? 0;
    const max3 = d3.max(data, (d) => d.Close) ?? 0;
    const max = d3.max([max1, max2, max3]) ?? 0;

    y = d3
      .scaleLinear()
      .domain([min, max] as [number, number])
      .range([height - 70, 0]);
    // y = d3
    //   .scaleLinear()
    //   .domain([1000, 80000] as [number, number])
    //   .range([height - 70, 0]);

    yRef.current = y;

    // Volume bars
    createAxix(chartArea, x, yRef.current, data);

    // Vertical and horizontal line
    drawVerticalAndHorizontalLine();

    // Zoom behavior
    // addZoomBehavior(
    //   yRef.current,
    //   data,
    //   candleWidth,
    //   xRef.current,
    //   setStockPrices,
    //   xOrigin,
    // );

    //MOUSE EVENT
    addMouseEvents(yRef.current, data, setStockPrices, xRanges);
  }, [data]);

  useEffect(() => {
    // CandlesticksChart and Wicks
    if (selectedChart === 0) {
      deleteLineChart();
      deleteBarChart();
      createCandlestickChart(xRef.current, yRef.current, data, candleWidth);
    }
    if (selectedChart === 1) {
      deleteCandlestickChart();
      deleteBarChart();
      createLineChart(xRef.current, yRef.current, data);
    }
    if (selectedChart === 2) {
      deleteCandlestickChart();
      deleteLineChart();
      createBarChart(xRef.current, yRef.current, data, candleWidth);
    }
  }, [selectedChart, data]);

  useEffect(() => {
    //DRAG EVENT
    if (!xRef.current) return;
    // addZoomBehavior(
    //   yRef.current,
    //   data,
    //   candleWidth,
    //   xRef.current,
    //   setStockPrices,
    //   xOrigin,
    // );
    addDragBehavior(
      xRef.current,
      yRef.current,
      data,
      xOrigin,
      setXOrigin,
      setStockPrices,
    );
  }, [xOrigin]);

  useEffect(() => {
    visibleIndicators.forEach((indicator) => {
      switch (indicator) {
        case "Moving Average 10":
          addSMALine(
            xRef.current,
            ric,
            data[0].Date,
            yRef.current,
            data.length,
            xOrigin,
          );
          break;
        case "Moving Average 50":
          addSMA50Line(
            xRef.current,
            ric,
            data[0].Date,
            yRef.current,
            data.length,
            xOrigin,
          );
          break;
        case "Moving Average 20":
          addSMA20Line(
            xRef.current,
            ric,
            data[0].Date,
            yRef.current,
            data.length,
            xOrigin,
          );
          break;
        case "Bollinger Bands":
          addBBLine(
            xRef.current,
            ric,
            data[0].Date,
            yRef.current,
            data.length,
            xOrigin,
          );
          break;
        case "MACD":
          addMACDLine(xRef.current, ric, data[0].Date, data.length, xOrigin);
          break;
        case "Money Flow Index":
          addMFILine(xRef.current, ric, data[0].Date, data.length, xOrigin);
          break;
        case "Relative Strength Index":
          addRSILine(xRef.current, ric, data[0].Date, data.length, xOrigin);
          break;
        default:
          break;
      }
    });
  }, [visibleIndicators]);

  return (
    <>
      <div className="flex flex-row items-center gap-x-[1rem]">
        <h3 className="text-[1rem] font-bold text-text_sub">
          {new Date(stockPrices.Date).toLocaleDateString("en-US")}
        </h3>

        <div className="flex flex-row items-center gap-x-[0.6rem] text-green">
          {stockPrices &&
            Object.entries(stockPrices).map(
              ([key, value]) =>
                key !== "Date" && (
                  <div
                    key={key}
                    className={`flex flex-row items-center text-[1rem] font-medium ${stockPrices.Close > stockPrices.Open ? "text-green" : "text-red"}`}
                  >
                    <p className="items-center text-[1rem] text-text_sub">
                      {key === "Volume"
                        ? key.slice(0, 1).toUpperCase() +
                          key.slice(1, 3).toLocaleLowerCase()
                        : key.slice(0, 1).toUpperCase()}
                      :{" "}
                    </p>
                    {Number(value).toFixed(0)}
                  </div>
                ),
            )}
        </div>
      </div>
      <svg className="z-10" ref={svgRef} />
    </>
  );
});

export default React.memo(Charts);
