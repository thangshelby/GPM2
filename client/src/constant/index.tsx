import { TbChartCandle, TbChartCandleFilled } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import { TbChartDots } from "react-icons/tb";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
const width = 1200;
const height = 450;

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
    { icon: <IoDiamondOutline size={16} color="#e8e9eb" /> },
    { icon: <MdOutlineZoomOutMap size={16} color="#e8e9eb" /> },
    { icon: <CiSettings size={16} color="#e8e9eb" /> },
  ];
export  const indicatorFilter = [
    {
      title: "Moving Average",
      key:'sma'
    },
    {
      title: "Money Flow Index",
      key:'mfi'
    },
    {
      title: "Bollinger Bands",
      key:'bb'
    },
    {
      title: "Relative Strength Index",
      key: "rsi",
    },{
      title:'MACD',
      key:'macd'
    }
  ]
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