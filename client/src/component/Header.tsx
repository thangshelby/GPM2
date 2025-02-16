import { headerLinks } from "../constant/index";
import { StockInfomationType } from "../type";
import { useEffect, useState, useCallback } from "react";
import { fetchStock } from "../api";
import { FaSearch } from "react-icons/fa";
import { router } from '@tanstack/react-router';
interface allStocksType {
  RIC: string;
  Name: string;
  Exchange: string;
  Market: string;
  Sector: string;
}
const Header = ({
  stockInfo,
  ric,
}: {
  stockInfo: StockInfomationType;
  ric: string;
}) => {
  const [allStocks, setAllStocks] = useState<StockInfomationType[]>([]);

  useEffect(() => {
    const fetchAllStocks = async () => {
      await fetchStock("/stocks/all_stock_rics").then((data) => {
        setAllStocks(data);
      });
    };
    fetchAllStocks();
  }, []);
  const [ricMatch, setRicMatch] = useState<allStocksType[]>([]);
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const match = allStocks.filter((stock) => {
      return stock.RIC.toLocaleLowerCase().includes(input);
    });
    // console.log(match, input);
    setRicMatch(match);
  }, [input]);

  console.log(ricMatch);
  return (
    <div className="flex flex-row items-center justify-between bg-[#181b22] px-[2rem]">
      {/* HEADER 1 */}
      <div className="flex flex-col">
        <div className="flex flex-row items-end gap-x-[0.8rem]">
          <h1 className="text-[2.4rem] font-bold leading-[1.2] text-text_sub">
            {stockInfo.RIC}
          </h1>
          <p className="text-[1.6rem] font-semibold text-text_primary">
            {stockInfo.Name}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-[0.6rem]">
          <p className="text-[1.1rem] font-semibold text-text_primary">
            {stockInfo.Exchange}
          </p>
          <p className="text-[1.1rem] font-semibold text-text_primary">
            {stockInfo.Market}
          </p>
          <p className="text-[1.1rem] font-semibold text-text_primary">
            {stockInfo.Sector}
          </p>

          <p className="text-[1.1rem] font-semibold text-text_primary">
            {stockInfo.Currency}
          </p>
        </div>
      </div>

      {/* HEADER 2 */}
      <div className="mt-[1.6rem] flex flex-col items-end gap-y-[0.8rem]">
        {/* <div className="font-semibold] text-[1rem] text-text_sub">
          {new Date().toLocaleDateString("en-US")}
        </div>
        <div className="flex flex-row items-center justify-end gap-x-[0.6rem]">
          <h3 className="text-[2.4rem] font-semibold text-text_sub">236.85</h3>
          <div>
            <p className="text- text-end text-[0.9rem] font-semibold text-red">
              +0.23
            </p>
            <p className="text- text-end text-[0.9rem] font-semibold text-red">
              (+0.10%)
            </p>
          </div>
        </div> */}

        <div className="relative">
          <div className="flex w-[40rem] flex-row items-center gap-x-[0.8rem] rounded-xl bg-[#262626] px-[0.8rem] py-[0.6rem] focus-within:border-[0.1rem] focus-within:border-white focus-within:bg-[#141414]">
            <FaSearch className="text-white" size={12} />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-[1.4rem] text-white outline-none placeholder:text-[1.6rem]"
              placeholder="Tìm kiếm"
            />
          </div>
          {input.length > 0 && (
            <div className="topp-[10px] absolute left-0 z-50 h-[18rem] gap-y-[0.6rem] overflow-y-scroll mt-[0.6rem] 
            bg-[#22262f] p-[0.8rem] py-[1rem] rounded-xl hover:cursor-pointer shadow-2xl">
              {ricMatch.map((stock, index) => (
                <div
                  onClick={() =>{
                    window.location.href=`/stock/lazy/${stock.RIC.split('.')[0].toLocaleLowerCase()}`
                  }}
                  key={index}
                  className={`flex flex-row items-center justify-between gap-x-[1rem] hover:bg-[#363a46] 
                     p-[0.4rem] py-[0.3rem] rounded-lg`}
                >
                  <p className="text-[1.1rem] font-semibold text-text_primary">
                    {stock.RIC}
                  </p>
                  <p className="text-[1.1rem] font-semibold text-text_primary text-start truncate">
                    {stock.Name}
                  </p>

                  {/* <p className="text-[1.1rem] font-semibold text-text_primary">
                  {stock.Market}
                </p> */}
                  <p className="text-[1.1rem] font-semibold text-text_primary">
                   {/* {stock.Sector==='-'? stock.Exchange: stock.Sector} */}
                   {stock.Exchange}
                   
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="flex flex-row items-center justify-end gap-x-[0.4rem]">
          {headerLinks.map((option) => (
            <p
              key={option}
              className="text-[1rem] font-semibold text-text_primary"
            >
              {option}
            </p>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Header;

//   {/* HEADER */}
//   <div
//   ref={headerRef}
//   className="flex flex-row items-center justify-between bg-[#181b22] px-[2rem]"
// >
//   {/* HEADER 1 */}
//   <div className="flex flex-col gap-y-[0.2rem]">
//     <div className="flex flex-row items-center gap-x-[0.8rem]">
//       <h1 className="text-[2.4rem] font-bold text-text_sub">AAPL</h1>
//       <p className="text-[1.6rem] font-semibold text-text_primary">
//         Apple Inc.
//       </p>
//     </div>
//     <div className="flex flex-row items-center gap-x-[0.6rem]">
//       {optons1.map((option) => (
//         <p
//           key={option}
//           className="text-[1rem] font-semibold text-text_primary"
//         >
//           {option}
//         </p>
//       ))}
//     </div>
//   </div>

//   {/* HEADER 2 */}
//   <div className="flex flex-col items-end gap-y-[0.2rem]">
//     <div className="font-semibold] text-[1rem] text-text_sub">
//       {new Date().toLocaleDateString("en-US")}
//     </div>
//     <div className="flex flex-row items-center justify-end gap-x-[0.6rem]">
//       <h3 className="text-[2.4rem] font-semibold text-text_sub">
//         236.85
//       </h3>
//       <div>
//         <p className="text- text-end text-[0.9rem] font-semibold text-red">
//           +0.23
//         </p>
//         <p className="text- text-end text-[0.9rem] font-semibold text-red">
//           (+0.10%)
//         </p>
//       </div>
//     </div>
//     <div className="flex flex-row items-center justify-end gap-x-[0.4rem]">
//       {option2.map((option) => (
//         <p
//           key={option}
//           className="text-[1rem] font-semibold text-text_primary"
//         >
//           {option}
//         </p>
//       ))}
//     </div>
//   </div>
// </div>
