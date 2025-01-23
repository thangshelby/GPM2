import * as d3 from "d3";
import { fetchStock } from "../../api";

const addSMALine = async (x: any, y: any,dataUsed:number,xOrigin:number) => {
  removeSMALine();

  const data = await fetchStock("/indicators/SMA");

  const chartArea = d3.select(".chart-area");

  const line = d3
    .line<any>()
    .x((d: any) => (x(d.Date) ?? 0) + x.bandwidth() / 2)
    .y((d: any) => y(d.SMA));

  console.log(xOrigin);
  chartArea
    .append("path")
    .data([data.slice(0, dataUsed)])
    .attr("class", "sma-line")
    .attr("d", line)
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .attr("fill", "none")
    .attr('transform', `translate(${xOrigin},0)`);  
};

export default addSMALine;

export const removeSMALine = () => {
  const chartArea = d3.select(".chart-area");
  chartArea.select(".sma-line").remove();
};

export const hiddenSMALine = (chartArea: any) => {
  chartArea.select(".sma-line").attr("display", "none");
};
