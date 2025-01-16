import React from "react";
import { useStockPriceStore } from "../../store/store";

const PriceBar = () => {
  const { stockPrice } = useStockPriceStore();

  return (
    <div className="flex flex-row items-center  px-[1rem] gap-x-[1rem]">
      <h3 className="text-[1rem] text-text_sub font-bold">
        {/* {new Date(stockPrice?.Date).toLocaleDateString("en-US")} */}
      </h3>

      <div className="flex flex-row items-center gap-x-[0.6rem] text-green">
        {stockPrice &&
          Object.entries(stockPrice).map(
            ([key, value]) =>
              key !== "Date" && (
                <div
                  key={key}
                  className={`text-[1rem] flex flex-row items-center font-medium ${stockPrice.Close > stockPrice.Open ? "text-green" : "text-red"}`}
                >
                  <p className="text-[1rem] items-center text-text_sub">
                    {key === "Volume"
                      ? key.slice(0, 1).toUpperCase() +
                        key.slice(1, 3).toLocaleLowerCase()
                      : key.slice(0, 1).toUpperCase()}
                    :{" "}
                  </p>
                  {Number(value)}
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default PriceBar;
