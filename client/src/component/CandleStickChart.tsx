import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { StockPriceType } from "../type";
import { createAxix, createCandlestickChart } from "../d3/drawD3";
import { addMouseEvents, addZoomBehavior } from "../d3/eventD3";
type parsedDataType = StockPriceType & { date: Date };

const CandlestickChart: React.FC<{
  data: StockPriceType[];
  headerHeight: number;
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
  const width = 1200;
  const height = 400;

  const parsedData: parsedDataType[] = data.map((d) => ({
    ...d,
    date: new Date(d.Date),
  }));

  // Create x and y axes

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("class", "candlestick-chart");

    // Chart area
    const chartArea = svg.append("g");

    // X and Y scales

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsedData, (d) => d.date) as [Date, Date])
      .range([0, width - 60])
      .nice();

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.Low - 500),
        d3.max(data, (d) => d.High + 100),
      ] as [number, number])
      .range([height - 50, 0]);

    // CandlesticksChart and Wicks
    createCandlestickChart(chartArea, x, y, parsedData, candleWidth);

    // Volume bars
    createAxix(chartArea, x, y);

    // Zoom behavior
    addZoomBehavior(svg, chartArea, parsedData, candleWidth, x);

    //MOUSE EVENT
    addMouseEvents(chartArea, x, y, parsedData, svg, setStockPrices);

    //DRAG EVENT
    const dragReact = chartArea
      .append("rect")
      .attr("class", "drag_rect")
      .attr("x", 100)
      .attr("y", 100)
      .attr("width", 40)
      .attr("height", 40)
      .attr("fill", "red");

    d3.select<SVGRectElement, unknown>(".drag_rect").call(
      d3
        .drag<SVGRectElement, unknown>()
        .on("start", (event: any) => {
          d3.select(this).classed("dragging", true);
        })
        .on("drag", (event) => {
          const [xCor, yCor] = d3.pointer(event);

          const date = x.invert(xCor);
          const price = y.invert(yCor);

          dragReact.attr("x", xCor - 60).attr("y", yCor - 200);
        })
        .on("end", function () {
          // Remove dragging class when done
          d3.select(this).classed("dragging", false);
        })
    );

    // (
    //   chartArea as unknown as d3.Selection<
    //     SVGGElement,
    //     unknown,
    //     null,
    //     undefined
    //   >
    // ).call(
    //   d3
    //     .drag<SVGGElement, unknown, unknown>()
    //     .on("drag", (event) => console.log("dragging"))
    // );

    // const drag = d3
    //   .drag()
    //   .on("start", function (event) {
    //     // You can set cursor style when dragging starts
    //     d3.select(this).style("cursor", "pointer");
    //   })
    //   .on("drag", function (event) {
    //     d3.select(this).style("cursor", "pointer");

    //     // Dragging logic here...
    //   })
    //   .on("end", function (event) {
    //     // You can reset cursor style when dragging ends if you like
    //     d3.select(this).style("cursor", "pointer");
    //   });

    // // Apply the drag behavior to your element(s)
    // d3.select<SVGSVGElement, unknown>("your-element-selector").call(drag as any);
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
