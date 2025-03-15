import { TbChartCandle } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoBarChart } from "react-icons/io5";
const width = 1200;
const height = 450;

const optons1 = ["Technology", "Consumer Electromics", "USA", "NASD"];

const headerLinks = [
  "Stock Detail",
  "Company Profile",
  "Financials",
  "Analyst Ratings",
  "Insider Trading",
  "Institutional Ownership",
  "Income Statement",
];

const option3 = [
  {
    title: "Candle Chart",
    icon: <TbChartCandle size={16} color="#e8e9eb" />,
  },
  {
    title: "Line Chart",
    icon: <FaChartLine size={16} color="#e8e9eb" />,
  },
  {
    title: "Bar Chart",
    icon: <IoBarChart size={16} color="#e8e9eb" />,
  },
];

const option4 = [
  { title: "Share", icon: <CiShare2 size={16} color="#e8e9eb" /> },
  // { icon: <IoDiamondOutline size={16} color="#e8e9eb" /> },
  { icon: <MdOutlineZoomOutMap size={16} color="#e8e9eb" /> },
  { icon: <CiSettings size={16} color="#e8e9eb" /> },
];
export const indicatorFilter = [
  {
    title: "Moving Average 10",
    key: "sma",
  },
  {
    title: "Moving Average 20",
    key: "sma_20",
  },
  {
    title: "Moving Average 50",
    key: "sma_50",
  },
  {
    title: "Money Flow Index",
    key: "mfi",
  },
  {
    title: "Bollinger Bands",
    key: "bb",
  },
  {
    title: "Relative Strength Index",
    key: "rsi",
  },
  {
    title: "MACD",
    key: "macd",
  },
];
const dateFilter = ["Daily", "Weekly", "Monthly"];
export { width, height, optons1, headerLinks, option3, option4, dateFilter };
export const footerContent=" © 2025 University of Economics and Law (UEL). All rights reserved. The content of this report is created for educational and research purposes and is the intellectual property of the author. It may not be copied, distributed, or reused in any form without prior written consent from the author or the university. The information in this report has been collected and compiled from reliable sources; however, UEL and the author bear no responsibility for any errors, omissions, or losses arising from the use of this content. All opinions and views expressed in this report are solely those of the author and do not represent the official stance of the University of Economics and Law. UEL and its logo are registered trademarks."

export function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
