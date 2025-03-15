import { StockInfomationType } from "../type";
import { useEffect, useState } from "react";
import { fetchStock } from "../api";
import { FaSearch } from "react-icons/fa";
interface allStocksType {
  RIC: string;
  Name: string;
  Exchange: string;
  Market: string;
  Sector: string;
}
const Header = ({ stockInfo }: { stockInfo: StockInfomationType }) => {
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
      
      return stock.RIC.toLocaleLowerCase().includes(input)||stock.Name.toLocaleLowerCase().includes(input) ;
    });
    setRicMatch(match);
  }, [input]);

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
            <div className="absolute left-0 z-50 mt-[0.6rem] h-[18rem] w-full gap-y-[0.6rem] overflow-y-scroll rounded-xl bg-[#22262f] p-[0.8rem] py-[1rem]   dow-2xl hover:cursor-pointer">
              {ricMatch.length ? (
                ricMatch.map((stock, index) => (
                  <div
                    onClick={() => {
                      window.location.href = `/stock/lazy/${stock.RIC.split(".")[0].toLocaleLowerCase()}`;
                    }}
                    key={index}
                    className={`flex flex-row items-center justify-between gap-x-[1rem] rounded-lg p-[0.4rem] py-[0.3rem] hover:bg-[#363a46]`}
                  >
                    <p className="text-[1.1rem] font-semibold text-text_primary">
                      {stock.RIC}
                    </p>
                    <p className="truncate text-start text-[1.1rem] font-semibold text-text_primary">
                      {stock.Name}
                    </p>

                    <p className="text-[1.1rem] font-semibold text-text_primary">
                      {stock.Exchange}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-row items-center justify-center text-white text-3xl font-semibold h-full">
                  Không tìm thấy mã cổ phiếu
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
