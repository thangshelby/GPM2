import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { StockPriceType } from "../type";
import { createAxix, createCandlestickChart } from "../d3/drawD3";
import { addMouseEvents, addZoomBehavior } from "../d3/eventD3";
import { width, height } from "../constant";

const CandlestickChart: React.FC<{
  data: StockPriceType[];

}> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [candleWidth, setCandleWidth] = useState(6);

  const [stockPrices, setStockPrices] = useState<{
    Date: string;
    Open: number;
    Close: number;
    High: number;
    Low: number;
  }>(data[0]);

  const [originX, setOriginX] = useState(0);

  // Create x and y axes

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();


    // SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width*2)
      .attr("height", height*2)
      .attr("class", "candlestick-chart");
    // Chart area

    const chartArea = svg.append("g")
    .attr('class','chart-area')
    .attr('width',width)
    .attr('height',height)
    ;


    const parseDate = d3.timeParse("%Y-%m-%d");

    // Làm tròn các ngày thành tuần
    const weeks = Array.from(new Set(data.map(d => d3.timeWeek.floor(parseDate(d.Date) as Date ))));
    
    // X and Y scales

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.Date))
      .range([0, width - 80])
      .padding(0);

    const xRanges = data.reduce(
      (
        acc: {
          [key: string]: {
            xStart: number | undefined;
            xEnd: number | undefined;
          };
        },
        d
      ) => {
        const xStart = x(d.Date);
        const xEnd = xStart! + x.bandwidth();
        acc[d.Date] = { xStart, xEnd }; // Lưu phạm vi xStart và xEnd cho mỗi giá trị
        return acc;
      },
      {}
    );

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.Low - 500),
        d3.max(data, (d) => d.High + 100),
      ] as [number, number])
      .range([height - 50, 0]);

    // CandlesticksChart and Wicks
    createCandlestickChart(chartArea, x, y, data, candleWidth);

    // Volume bars
    createAxix(chartArea, x, y);

    // Zoom behavior
    addZoomBehavior(svg, chartArea, data, candleWidth, x);

    //MOUSE EVENT
    addMouseEvents(chartArea, x, y, data, svg, setStockPrices, xRanges);

    // DRAG EVENT
    // const dragRect = chartArea
    //   .append("rect")
    //   .attr("class", "ine")
    //   .attr("x", 100)
    //   .attr("x", 100)
    //   .attr("width", 200)
    //   .attr("height", 200)
    //   .style("stroke", "#616a7a")

    // // let initialDragX=0
    // // let originX= 0;
    // d3.select<SVGRectElement, unknown>(".candlestick-chart").call(
    //   d3
    //     .drag<SVGRectElement, unknown>()
    //     .on("start", (event: any) => {
    //       const xCor = event.x;
    //       // initialDragX = xCor;
    //       console.log(xCor);
    //     })
    //     .on("drag", (event) => {
    //       const xCor = event.x;
    //       // console.log(xCor, initialDragX,originX);
    //       // const xCorDiff = xCor - initialDragX-originX;
    //       // originX = xCorDiff;
       
          
    //       // dragRect.attr("x", xCorDiff);
    //       // chartArea.attr("transform", `translate(${xCorDiff},0)`);
    //     })
    //     .on("end", function () {
    //       // setOriginX(originX);
    //       d3.select(this).classed("dragging", false);
    //     })
    // );
  }, [data]);

  return (
    <>
      <div className="flex flex-row items-center  px-[1rem] gap-x-[1rem]">
        <h3 className="text-[1rem] text-text_sub font-bold">
          {new Date(stockPrices.Date).toLocaleDateString("en-US")}
        </h3>

        <div className="flex flex-row items-center gap-x-[0.6rem] text-green">
          {stockPrices &&
            Object.entries(stockPrices).map(
              ([key, value]) =>
                key !== "Date" && (
                  <div
                    key={key}
                    className={`text-[1rem] flex flex-row items-center font-medium ${stockPrices.Close > stockPrices.Open ? "text-green" : "text-red"}`}
                  >
                    <p className="text-[1rem] items-center text-text_sub">
                      {key === "Volume"
                        ? key.slice(0, 1).toUpperCase() +
                          key.slice(1, 3).toLocaleLowerCase()
                        : key.slice(0, 1).toUpperCase()}
                      :{" "}
                    </p>
                    {Number(value).toFixed(0)}
                  </div>
                )
            )}
        </div>
      </div>
      <svg className="z-10" ref={svgRef} />
    </>
  );
};

export default React.memo(CandlestickChart);
