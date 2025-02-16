import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import Charts from "../../component/Charts";
import { StockPriceType, StockInfomationType } from "../../type";
import { fetchStock } from "../../api";
import ChartControl from "../../component/ChartControl";
import Header from "../../component/Header";
export const Route = createFileRoute("/stock/lazy/$ric")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const data = await fetchStock(
        `/stocks/stock_prices?ticker=${params.ric}`,
      );

      const stockInfo = await fetchStock(
        `/stocks/stock_info?ticker=${params.ric.toLocaleUpperCase()}`,
      );

      return { data, stockInfo: stockInfo[0], ric: params.ric };
    } catch (error) {
      return [];
    }
  },
});
function RouteComponent() {
  const response: {
    data: StockPriceType[];
    stockInfo: StockInfomationType;
    ric: string;
  } = Route.useLoaderData();
  const { data, stockInfo, ric } = response;

  const [isOpenSelectChart, setIsOpenSelectChart] = useState(false);
  const [selectedChart, setSelectedChart] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState(0);
  const [isOpenIndicatorFilter, setIsOpenIndicatorFilter] = useState(false);

  const slicedData = useMemo(() => {
    // const groupByWeek = (data: StockPriceType[]): StockPriceType[] => {
    //   const weeklyDataMap = new Map<string, StockPriceType>();

    //   data.forEach((entry) => {
    //     const date = parseISO(entry.Date);
    //     const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Tuần bắt đầu vào thứ 2
    //     const weekKey = weekStart.toISOString(); // Key là ngày đầu tuần

    //     if (!weeklyDataMap.has(weekKey)) {
    //       weeklyDataMap.set(weekKey, {
    //         Date: endOfWeek(date, { weekStartsOn: 1 }).toISOString(), // Ngày cuối tuần
    //         Open: entry.Open,
    //         Close: entry.Close,
    //         High: entry.High,
    //         Low: entry.Low,
    //         Volume: entry.Volume,
    //       });
    //     } else {
    //       const weeklyEntry = weeklyDataMap.get(weekKey)!;
    //       weeklyEntry.Close = entry.Close; // Giá đóng của ngày cuối
    //       weeklyEntry.High = Math.max(weeklyEntry.High, entry.High);
    //       weeklyEntry.Low = Math.min(weeklyEntry.Low, entry.Low);
    //       weeklyEntry.Volume += entry.Volume; // Tổng volume
    //     }
    //   });

    //   return Array.from(weeklyDataMap.values());
    // };

    // return groupByWeek(data);

    // const groupByMonth = (data:StockPriceType[]): StockPriceType[] => {
    //   const monthlyDataMap = new Map<string,StockPriceType>();

    //   data.forEach((entry) => {
    //     const date = parseISO(entry.Date);
    //     const monthStart = startOfMonth(date); // Lấy ngày đầu tháng
    //     const monthKey = monthStart.toISOString(); // Key là ngày đầu tháng

    //     if (!monthlyDataMap.has(monthKey)) {
    //       monthlyDataMap.set(monthKey, {
    //         Date: endOfMonth(date).toISOString(), // Ngày cuối tháng
    //         Open: entry.Open,
    //         Close: entry.Close,
    //         High: entry.High,
    //         Low: entry.Low,
    //         Volume: entry.Volume,
    //       });
    //     } else {
    //       const monthlyEntry = monthlyDataMap.get(monthKey)!;
    //       monthlyEntry.Close = entry.Close; // Giá đóng của ngày cuối cùng trong tháng
    //       monthlyEntry.High = Math.max(monthlyEntry.High, entry.High);
    //       monthlyEntry.Low = Math.min(monthlyEntry.Low, entry.Low);
    //       monthlyEntry.Volume += entry.Volume; // Tổng volume
    //     }
    //   });

    //   return Array.from(monthlyDataMap.values());
    // };

    // return groupByMonth(data);

    // const filterdData= data.map((d)=>{
    //   if (d.Open<d.Close){
    //     const close= d.Close
    //     const open = d.Open
    //     const newD= {...d, Close: open, Open: close}
    //     return newD
    //   }
    //   return d
    // })
    // return filterdData.slice(0,data.length-300);
    return data.slice(data.length - 1000, data.length);

    return data.slice(0, 300);
  }, [data]);

  return (
    <div className="h-screen w-full overflow-y-auto bg-[#181b22]">
      <Header stockInfo={stockInfo} ric={ric} />
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

          <Charts data={slicedData} selectedChart={selectedChart} ric={ric} />
        </div>
      </div>
    </div>
  );
}
