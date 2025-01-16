import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import CandlestickChart from "../../component/CandleStickChart";
import { FaPenNib } from "react-icons/fa";
import { TbChartCandle, TbChartCandleFilled } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import { TbChartDots } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";
import { StockPriceType } from "../../type";


export const Route = createFileRoute("/stock/lazy/$ric")({
  component: RouteComponent,
  loader: async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/stocks/stock_prices");
      if (!response.ok) throw new Error("Failed to fetch stock data");
      return await response.json();
    } catch (error) {
      return [];
    }
  },
});

function RouteComponent() {
  const data: StockPriceType[] = Route.useLoaderData();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isOpenSelectOption, setIsOpenSelectOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState(0);
 
  const optons1 = ["Technology", "Consumer Electromics", "USA", "NASD"];

  return (
    <div className="h-screen w-full bg-[#181b22]">
      {/* HEADER */}
      <div
        ref={headerRef}
        className="px-[2rem] flex flex-row items-center justify-between bg-[#181b22]"
      >
        {/* HEADER 1 */}
        <div className="flex flex-col gap-y-[0.2rem]">
          <div className="flex flex-row items-center gap-x-[0.8rem]">
            <h1 className="text-[2.4rem] font-bold text-text_sub ">AAPL</h1>
            <p className="text-[1.6rem] text-text_primary font-semibold ">
              Apple Inc.
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-[0.6rem]">
            {optons1.map((option) => (
              <p
                key={option}
                className="text-[1rem] text-text_primary font-semibold"
              >
                {option}
              </p>
            ))}
          </div>
        </div>

        {/* HEADER 2 */}
        <div className="flex flex-col items-end gap-y-[0.2rem]">
          <div className="text-[1rem] text-text_sub font-semibold]">
            {new Date().toLocaleDateString("en-US")}
          </div>
          <div className="flex flex-row items-center justify-end gap-x-[0.6rem]">
            <h3 className="text-[2.4rem] text-text_sub font-semibold ">
              236.85
            </h3>
            <div>
              <p className="text-[0.9rem] text- font-semibold text-red text-end">
                +0.23
              </p>
              <p className="text-[0.9rem] text- font-semibold text-red text-end">
                (+0.10%)
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-x-[0.4rem]">
            {option2.map((option) => (
              <p
                key={option}
                className="text-[1rem]
               text-text_primary font-semibold "
              >
                {option}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* CandleStickChart */}
      <div className="px-[4rem] py-[3.2rem] ">
        <div
          className="  border-[1px] shadow-2xl bg-[#22262f]
       border-white rounded-2xl p-[0.8rem] flex flex-col gap-y-[1.6rem]"
        >
          <div className="flex flex-row items-center justify-between ">
            {/* 2 BUTTON */}
            <div className="flex flex-row items-center gap-x-[0.6rem]">
              <div
                className="px-[1rem] py-[0.4rem] rounded-2xl bg-button
               flex flex-row items-center gap-x-[0.6rem] text-white text-[1.5rem]"
              >
                <FaPenNib size={10} />
                <p className="text-[1.4rem] font-semibold">Draw</p>
              </div>
              <div
                className="px-[1rem] py-[0.4rem] rounded-2xl bg-button
               flex flex-row items-center gap-x-[0.6rem] text-white text-[1.5rem]"
              >
                <FaRegLightbulb size={10} />
                <p className="text-[1.4rem] font-semibold">Idea</p>
              </div>
            </div>

            <div className="flex flex-row items-center z-40 gap-x-[0.6rem]">
              {/* CHART FILTER */}
              <div
                onClick={() => {
                  setIsOpenSelectOption(!isOpenSelectOption);
                }}
                className={`${isOpenSelectOption ? "border-text_primary" : "border-text_sub"} w-[12rem] px-[1rem] py-[0.4rem] relative gap-x-[0.6rem] 
              rounded-md hover:cursor-pointer flex flex-row  items-center bg-[#22262f] border-[0.1rem] `}
              >
                {option3[selectedOption].icon}
                <p className="w-[100%] text-[1.4rem] text-white  font-medium truncate">
                  {option3[selectedOption].title}
                </p>
                <IoMdArrowDropdown size={20} color="#e8e9eb" />

                {isOpenSelectOption && (
                  <div className="absolute left-0 w-[14rem] p-[0.4rem] top-[120%] shadow-2xl z-50 rounded-md  flex flex-col  border-[0.1rem] ">
                    {option3.map((option, index) => (
                      <div
                        key={option.title}
                        onClick={() => {
                          setSelectedOption(index);
                          setIsOpenSelectOption(false);
                        }}
                        className={`p-[0.8rem] gap-x-[0.6rem] text-white text-[1rem] font-semibold flex flex-row items-center hover:bg-button duration-200 rounded-md ${selectedOption == index ? "bg-text_primary" : "bg-[#22262f]"}`}
                      >
                        {option.icon}
                        {option.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DATE FILTER */}
              <div className="flex flex-row items-center ">
                {dateFilter.map((option, index) => (
                  <p
                    onClick={() => {
                      setSelectedDateFilter(index);
                    }}
                    key={option}
                    className={`text-[1.4rem]   ${selectedDateFilter == index ? "border-text_primary bg-button border-[0.1rem] text-white" : "text-text_sub"} px-[1rem] py-[0.4rem] rounded-lg hover:cursor-pointer font-semibold hover:bg-button duration-200`}
                  >
                    {option}
                  </p>
                ))}
              </div>

              <div className=" p-[1rem] rounded-lg hover:cursor-pointer bg-button">
                <SlCalender size={14} color="#e8e9eb" />
              </div>
            </div>

            <div className="flex flex-row items-center gap-x-[0.6rem]">
              {option4.map((option, index) => (
                <div
                  key={index}
                  className={`px-[1rem] py-[0.4rem] rounded-2xl bg-button
 flex flex-row items-center gap-x-[0.6rem] text-white text-[1.5rem] hover:cursor-pointer ${index == 1 && "bg-text_primary"}`}
                >
                  {option.icon}
                  {option.title && (
                    <p className="text-[1.4rem] font-semibold">
                      {option.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

      

          <CandlestickChart
            headerHeight={headerRef.current?.clientHeight || 0}
            data={data.slice(0,130)}
          />
        </div>
      </div>
    </div>
  );
}

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

const dateFilter = ["InmtraDay", "Daily", "Weekly", "Monthly"];
