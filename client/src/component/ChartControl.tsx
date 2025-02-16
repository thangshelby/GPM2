import { FaPenNib, FaRegLightbulb, FaRegEye } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { option3, option4, dateFilter, indicatorFilter } from "../constant";
import { removeBBLine} from "../d3/indicators/BBLine";
import { removeSMALine} from "../d3/indicators/SMALine";
import { removeMACDLine } from "../d3/indicators/MACDLine";
import { removeMFILine } from "../d3/indicators/MFILine";
import { removeRSILine } from "../d3/indicators/RSILine";
import { useVisibleIndicatorsStore } from "../store/store";
import { removeSMA50Line } from "../d3/indicators/SMA50";
import { removeSMA20Line } from "../d3/indicators/SMA20Line";
const ChartControl = ({
  isOpenSelectChart,
  setIsOpenSelectChart,
  selectedChart,
  setSelectedChart,
  isOpenIndicatorFilter,
  setIsOpenIndicatorFilter,
  selectedDateFilter,
  setSelectedDateFilter,
}: {
  isOpenSelectChart: boolean;
  setIsOpenSelectChart: (value: boolean) => void;
  selectedChart: number;
  setSelectedChart: (value: number) => void;
  isOpenIndicatorFilter: boolean;
  setIsOpenIndicatorFilter: (value: boolean) => void;

  selectedDateFilter: number;
  setSelectedDateFilter: (value: number) => void;
}) => {
  const { visibleIndicators, setVisibleIndicators } =
    useVisibleIndicatorsStore();

  
  return (
    <div className="relative flex flex-col">
      <div className="flex flex-row items-center justify-between">
        {/* 2 BUTTON */}
        <div className="flex flex-row items-center gap-x-[0.6rem]">
          <div className="flex flex-row items-center gap-x-[0.6rem] rounded-2xl bg-button px-[1rem] py-[0.4rem] text-[1.5rem] text-white">
            <FaPenNib size={10} />
            <p className="text-[1.4rem] font-semibold">Draw</p>
          </div>
          <div className="flex flex-row items-center gap-x-[0.6rem] rounded-2xl bg-button px-[1rem] py-[0.4rem] text-[1.5rem] text-white">
            <FaRegLightbulb size={10} />
            <p className="text-[1.4rem] font-semibold">Idea</p>
          </div>
        </div>

        <div className="z-40 flex flex-row items-center gap-x-[0.6rem]">
          {/* CHART FILTER */}
          <div
            onClick={() => {
              setIsOpenIndicatorFilter(false);
              setIsOpenSelectChart(!isOpenSelectChart);
            }}
            className={` ${isOpenSelectChart ? "border-text_primary" : "border-text_sub"} relative flex w-[12rem] flex-row items-center gap-x-[0.6rem] rounded-md border-[0.1rem] bg-[#22262f] px-[1rem] py-[0.4rem] hover:cursor-pointer`}
          >
            {option3[selectedChart].icon}
            <p className="w-[100%] truncate text-[1.4rem] font-medium text-white">
              {option3[selectedChart].title}
            </p>
            <IoMdArrowDropdown size={20} color="#e8e9eb" />

            {isOpenSelectChart && (
              <div className="chart-filter absolute left-0 top-[120%] z-50 flex w-[14rem] flex-col rounded-md border-[0.1rem] p-[0.4rem] shadow-2xl">
                {option3.map((option, index) => (
                  <div
                    key={option.title}
                    onClick={() => {
                      setSelectedChart(index);
                      setIsOpenSelectChart(false);
                    }}
                    className={`flex flex-row items-center gap-x-[0.6rem] rounded-md p-[0.8rem] text-[1rem] font-semibold text-white duration-200 hover:bg-button ${selectedChart == index ? "bg-text_primary" : "bg-[#22262f]"}`}
                  >
                    {option.icon}
                    {option.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INDICATOR FILTER */}
          <div
            onClick={() => {
              setIsOpenSelectChart(false);
              setIsOpenIndicatorFilter(!isOpenIndicatorFilter);
            }}
            className={`chart-filter ${isOpenIndicatorFilter ? "border-text_primary" : "border-text_sub"} relative flex w-[12rem] flex-row items-center gap-x-[0.6rem] rounded-md border-[0.1rem] bg-[#22262f] px-[1rem] py-[0.4rem] hover:cursor-pointer`}
          >
            <p className="w-[100%] truncate text-[1.4rem] font-medium text-white">
              Indicators
            </p>
            <IoMdArrowDropdown size={20} color="#e8e9eb" />

            {isOpenIndicatorFilter && (
              <div className="chart-filter absolute left-0 top-[120%] z-50 flex w-[14rem] flex-col rounded-md border-[0.1rem] p-[0.4rem] shadow-2xl">
                {indicatorFilter.map((option) => (
                  <div
                    key={option.title}
                    onClick={() => {
                      if (!visibleIndicators.includes(option.title)) {
                        setVisibleIndicators([
                          ...visibleIndicators,
                          option.title,
                        ]);
                      }

                      setIsOpenIndicatorFilter(false);
                    }}
                    className={`flex flex-row items-center gap-x-[0.6rem] rounded-md bg-[#22262f] p-[0.8rem] text-[1rem] font-semibold text-white duration-200 hover:bg-button`}
                  >
                    {option.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DATE FILTER */}
          <div className="flex flex-row items-center">
            {dateFilter.map((option, index) => (
              <p
                onClick={() => {
                  setSelectedDateFilter(index);
                }}
                key={option}
                className={`text-[1.4rem] ${selectedDateFilter == index ? "border-[0.1rem] border-text_primary bg-button text-white" : "text-text_sub"} rounded-lg px-[1rem] py-[0.4rem] font-semibold duration-200 hover:cursor-pointer hover:bg-button`}
              >
                {option}
              </p>
            ))}
          </div>

          <div className="rounded-lg bg-button p-[1rem] hover:cursor-pointer">
            <SlCalender size={14} color="#e8e9eb" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-[0.6rem]">
          {option4.map((option, index) => (
            <div
              key={index}
              className={`flex flex-row items-center gap-x-[0.6rem] rounded-2xl bg-button px-[1rem] py-[0.4rem] text-[1.5rem] text-white hover:cursor-pointer ${index == 1 && "bg-text_primary"}`}
            >
              {option.icon}
              {option.title && (
                <p className="text-[1.4rem] font-semibold">{option.title}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {visibleIndicators.length > 0 && (
        <div className="flex flex-row items-center gap-x-[0.6rem]">
          {visibleIndicators.map((indicator, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-x-[0.6rem] py-[0.4rem] pr-[1rem]"
            >
              <p className="text-[1rem] text-white">{indicator}</p>
              <div className="p-[0.4rem] hover:cursor-pointer hover:bg-gray-400">
                <FaRegEye size={14} color="#e8e9eb" />
              </div>
              <div
                onClick={() => {
                  if (indicator === "Bollinger Bands") {
                    removeBBLine();
                  }
                  if (indicator === "Moving Average 10") {
                    removeSMALine();
                  }
                  if(indicator === 'Moving Average 50'){
                    removeSMA50Line()
                  }
                  if(indicator === 'Moving Average 50'){
                    removeSMA20Line()
                  }
                  if(indicator === 'MACD'){
                    removeMACDLine()
                  }
                  if(indicator === 'Money Flow Index'){
                    removeMFILine()
                  }
                  if(indicator === 'Relative Strength Index'){
                    removeRSILine()
                  }
                  setVisibleIndicators(
                    visibleIndicators.filter((item) => item !== indicator),
                  );
                }}
                className="p-[0.4rem] hover:cursor-pointer hover:bg-gray-400"
              >
                <IoMdClose size={14} color="#e8e9eb" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartControl;
