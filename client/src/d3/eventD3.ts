import * as d3 from "d3";
import { StockPriceType } from "../type";
type parsedDataType = StockPriceType
import { width,height } from "../constant";

export const addMouseEvents = (
    chartArea: any,
    x: any,
    y: any,
    data: parsedDataType[],
    svg: any,
    setStockPrices: (stockPrice: StockPriceType) => void,
    xRanges: { [key: string]: { xStart: number | undefined; xEnd: number | undefined } },
  ) => {
    const verticalLine = chartArea
      .append("line")
      .attr("class", "vertical_line")
      .attr("y1", 10)
      .attr("y2", height - 50)
      .style("stroke", "#616a7a")
      .style("opacity", 0);
  
    const rectLabelY = chartArea
      .append("rect")
      .attr("class", "vertextLabell")
      .attr("x", 0) // Initial x position
      .attr("y", 0) // Initial y position
      .style("opacity", 0) // Initially hidden
      .style("fill", "black")
      .style("width", "30px") // Width of the rectangle
      .style("height", "15px"); // Height of the rectangle
    const textLabelY = chartArea
      .append("text")
      .attr("class", "vertextLabel")
      .attr("x", 0) // Initial x position
      .attr("y", 0) // Initial y position
      .style("opacity", 0) // Initially hidden
      .style("font-size", "8px")
      .style("fill", "white");
  
    const horizontalLine = chartArea
      .append("line")
      .attr("class", "line")
      .attr("x1", 0)
      .attr("x2", width - 80)
      .style("stroke", "#616a7a")
      .style("opacity", 0);
  
    const rectLabelX = chartArea
      .append("rect")
      .attr("class", "horizLabel")
      .attr("x", 0) // Initial x position
      .attr("y", 0) // Initial y position
      .style("opacity", 0) // Initially hidden
      .style("fill", "black")
      .style("width", "60px") // Width of the rectangle
      .style("height", "15px"); // Height of the rectangle
  
    const textLabelX = chartArea
      .append("text")
      .attr("class", "horizLabel")
      .attr("x", 0) // Initial x position
      .attr("y", 0) // Initial y position
      .style("opacity", 0) // Initially hidden
      .style("font-size", "8px")
      .style("fill", "white");
    svg.on(
      "mousemove",
      (
        event: any
      ) => {
        const [xCor, yCor] = d3.pointer(event); // Lấy tọa độ chuột trong SVG

        if (xCor >= 5 && xCor <= 1120 && yCor >= 0 && yCor <= 340) {

          const foundDate = Object.keys(xRanges).find(date => {
  
            const { xStart, xEnd } = xRanges[date];
            return xStart! <= xCor && xCor <= xEnd!;
          });


          const date = foundDate || data[0].Date;

     
          const currentPrice = y.invert(yCor);

          const stockPrice =
            data.find((d: StockPriceType) => d.Date === date) || data[0];
          setStockPrices(stockPrice);
          
          verticalLine.attr("x1", xCor).attr("x2", xCor).style("opacity", 1);
          textLabelY
            .attr("x", width - 70) // Offset text slightly from the line
            .attr("y", yCor + 4) // Position text near the line
            .style("opacity", 1)
            .text(`${currentPrice.toFixed(0)}`);
          rectLabelY
            .attr("x", width - 70 - 5) // Offset text slightly from the line
            .attr("y", yCor - 7) // Position text near the line
            .style("opacity", 1);
  
          horizontalLine.attr("y1", yCor).attr("y2", yCor).style("opacity", 1);
        
          textLabelX
            .attr("x", xCor - 20) // Offset text slightly from the line
            .attr("y", height - 39) // Position text near the line
            .style("opacity", 1)
            .text(`${date}`);
          rectLabelX
            .attr("x", xCor - 30) // Offset text slightly from the line
            .attr("y", height - 50) // Position text near the line
            .style("opacity", 1);
        } else {
          verticalLine.style("opacity", 0); // Ẩn
          textLabelX.style("opacity", 0); // Ẩn
          rectLabelY.style("opacity", 0); // Ẩn
          horizontalLine.style("opacity", 0); // Ẩn
        }
      }
    );
  };
  
  export const addZoomBehavior = (svg:any,chartArea:any,parsedData:parsedDataType[],
      candleWidth:number,x:any)=>{
        //  const zoomLevels = [0.5, 1, 2, 3, 5];
        //   const zoom = d3
        //     .zoom()
        //     .scaleExtent([zoomLevels[0], zoomLevels[zoomLevels.length - 1]]) // Min and max zoom levels
        //     .on("zoom", (event) => {
        //       const { transform } = event;
              
        //       let zoomLevel = Math.round(transform.k);
        //       // Update scales
        //       const newX = transform.rescaleX(x);
        //       console.log(zoomLevel, transform.k,newX.domain());
      
        //       // Update candles
        //       chartArea
        //         .selectAll(".candle")
        //         .data(parsedData)
        //         .attr("x", (d:parsedDataType) => {
        //           return newX(d.Date)
        //         })
        //         .attr("width", candleWidth); // Adjust width if needed
      
        //       // Update volume bars
        //       chartArea
        //         .selectAll(".barVolume")
        //         .data(parsedData)
        //         .attr("x", (d:parsedDataType) => {
        //           return newX(d.Date) 
        //         })
        //         .attr("width", candleWidth); // Adjust width if needed
      
        //       // Update wicks
        //       chartArea
        //         .selectAll(".wick")
        //         .data(parsedData)
        //         .attr("x1", (d:parsedDataType) => newX(d.Date)-candleWidth/2)
        //         .attr("x2", (d:parsedDataType) => newX(d.Date)-candleWidth/2);
        //     });
      
        //   // Attach zoom behavior to SVG
        //   (
        //     svg as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>
        //   ).call(
        //     zoom as unknown as (
        //       selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
        //     ) => void
        //   );
  }