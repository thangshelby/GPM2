
import { TbChartCandle, TbChartCandleFilled } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import { TbChartDots } from "react-icons/tb";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";

const width = 1200;
const height = 400;

const optons1 = ["Technology", "Consumer Electromics", "USA", "NASD"];

const option2 = [
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
      title: "Candle - simple",
      icon: <TbChartCandle size={16} color="#e8e9eb" />,
    },
    {
      title: "Candle - advanced",
      icon: <TbChartCandleFilled size={16} color="#e8e9eb" />,
    },
    {
      title: "Line",
      icon: <FaChartLine size={16} color="#e8e9eb" />,
    },
    {
      title: "OHLC",
      icon: <TbChartDots size={16} color="#e8e9eb" />,
    },
  ];
  
  const option4 = [
    { title: "Share", icon: <CiShare2 size={16} color="#e8e9eb" /> },
    { icon: <IoDiamondOutline size={16} color="#e8e9eb" /> },
    { icon: <MdOutlineZoomOutMap size={16} color="#e8e9eb" /> },
    { icon: <CiSettings size={16} color="#e8e9eb" /> },
  ];
  
  const dateFilter = [ "Daily", "Weekly", "Monthly"];
export {
    width,
    height,
    optons1,
    option2,
    option3,
    option4,
    dateFilter
}