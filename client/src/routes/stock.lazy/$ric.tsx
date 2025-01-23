import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import Charts from "../../component/Charts";
import { StockPriceType } from "../../type";
import { fetchStock } from "../../api";
import ChartControl from "../../component/ChartControl";

export const Route = createFileRoute("/stock/lazy/$ric")({
  component: RouteComponent,
  loader: async () => {
    try {
      const data = await fetchStock("/stocks/stock_prices");
      return data;
    } catch (error) {
      return [];
    }
  },
});
function RouteComponent() {
  const data: StockPriceType[] = Route.useLoaderData();
  const [isOpenSelectChart, setIsOpenSelectChart] = useState(false);
  const [selectedChart, setSelectedChart] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState(0);
  const [isOpenIndicatorFilter, setIsOpenIndicatorFilter] = useState(false);

  const slicedData = useMemo(() => {
    return data.slice(0, 200);
  }, [data]);
  return (
    <div className="h-screen w-full overflow-y-auto bg-[#181b22]">
      {/* CandleStickChart */}
      <div className="px-[4rem] py-[3.2rem]">
        <div className="flex flex-col gap-y-[0.8rem] rounded-2xl border-[1px] border-white bg-[#22262f] p-[0.8rem] shadow-2xl">
          <ChartControl
            isOpenSelectChart={isOpenSelectChart}
            setIsOpenSelectChart={setIsOpenSelectChart}
            selectedChart={selectedChart}
            setSelectedChart={setSelectedChart}
            isOpenIndicatorFilter={isOpenIndicatorFilter}
            setIsOpenIndicatorFilter={setIsOpenIndicatorFilter}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
          />

          <Charts data={slicedData}
          selectedChart={selectedChart}
          />
        </div>
      </div>
    </div>
  );
}
