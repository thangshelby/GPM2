import { createLazyFileRoute } from "@tanstack/react-router";
import * as d3 from "d3";
import React, { useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";
import Select from "react-select";

export const Route = createLazyFileRoute("/about")({
  component: App,
});

function App() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => { 
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const line = d3
      .line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.close));

    const chartArea = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const data = [
      { date: new Date("2023-12-25"), close: 100 },
      { date: new Date("2023-12-26"), close: 110 },
      { date: new Date("2023-12-27"), close: 120 },
    ];

    x.domain(
      d3.extent(data, (d: any) => {
        return d.date;
      }) as [Date, Date]
    );
    y.domain(
      d3.extent(data, (d: any) => {
        return d.close;
      }) as [number, number]
    );

    chartArea
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chartArea
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    chartArea
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  },[])

  return (
    <div style={{ padding: "20px" }}>
      <svg className="z-10" ref={svgRef} />
    </div>
  );
}

const stockData = [
  {
    name: "HPG",
    data: [
      { x: new Date("2023-12-25"), y: [100, 105, 95, 102] },
      { x: new Date("2023-12-26"), y: [102, 110, 101, 108] },
      { x: new Date("2023-12-27"), y: [108, 112, 106, 110] },
      { x: new Date("2023-12-25"), y: [100, 105, 95, 102] },
      { x: new Date("2023-12-26"), y: [102, 110, 101, 108] },
      { x: new Date("2023-12-27"), y: [108, 112, 106, 110] },
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
