import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import Charts from "../../component/Charts";
import { StockPriceType, StockInfomationType } from "../../type";
import { fetchStock } from "../../api";
import ChartControl from "../../component/ChartControl";
import Header from "../../component/Header";
import BusinessSummary from "../../component/BusinessSummary";
import FinancialSummary from "../../component/FinancialSummary";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PDFPage3 from "../../component/PDFPage3";
import PDFPage4 from "../../component/PDFPage4";
import { useBusinessDataStore, useFinancialDataStore } from "../../store/store";
import { ClipLoader } from "react-spinners";
export const Route = createFileRoute("/stock/lazy/$ric")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const stockInfo = await fetchStock(
        `/stocks/stock_info?ticker=${params.ric.toLocaleUpperCase()}`,
      );

      const data = await fetchStock(
        `/stocks/stock_prices?ticker=${params.ric}&start_date=2020-01-01&end_date=2025-01-01`,
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
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [isOpenSelectChart, setIsOpenSelectChart] = useState(false);
  const [selectedChart, setSelectedChart] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState(0);
  const [isOpenIndicatorFilter, setIsOpenIndicatorFilter] = useState(false);
  const [financialSummary, setFinancialSummary] = useState<string>("");
  const { financialData } = useFinancialDataStore();
  const { businessData } = useBusinessDataStore();
  const [loading, setLoading] = useState(false);
  const slicedData = useMemo(() => {
    return data.slice(data.length - 1000, data.length);
  }, [data]);

  const businessRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);

  const chartRef = useRef<HTMLDivElement>(null);
  const generatePDF = async () => {
    setLoading(true);
    setProgressMessage("Đang chuẩn bị dữ liệu...");

    if (
      !businessRef.current ||
      !financialRef.current ||
      !page3Ref.current ||
      !page4Ref.current
    ) {
      setLoading(false);
      return;
    }

    // Chụp ảnh các phần tử HTML (business, financial, page3, page4)
    const canvasBusiness = await html2canvas(businessRef.current, {
      scale: 3,
      useCORS: true,
    });
    setProgressMessage("Đang tạo dữ liệu trang 1...");

    const canvasFinancial = await html2canvas(financialRef.current, {
      scale: 3,
      useCORS: true,
    });
    setProgressMessage("Đang tạo dữ liệu trang 2...");

    const canvasPage3 = await html2canvas(page3Ref.current, {
      scale: 3,
      useCORS: true,
    });
    setProgressMessage("Đang tạo dữ liệu trang 3...");

    const canvasPage4 = await html2canvas(page4Ref.current, {
      scale: 3,
      useCORS: true,
    });
    setProgressMessage("Đang tạo dữ liệu trang 4...");

    // Chuyển đổi canvas thành hình ảnh PNG
    const imgData1 = canvasBusiness.toDataURL("image/png");
    const imgData2 = canvasFinancial.toDataURL("image/png");
    const imgData3 = canvasPage3.toDataURL("image/png");
    const imgData4 = canvasPage4.toDataURL("image/png");

    // Tạo PDF từ hình ảnh
    const pdf = new jsPDF("p", "mm", "a4"); // Chế độ dọc, mm, khổ A4
    const imgWidth = 210; // A4 chiều rộng (210mm)
    const imgHeight = 297;

    pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.addPage();
    pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.addPage();
    pdf.addImage(imgData3, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.addPage();
    pdf.addImage(imgData4, "PNG", 0, 0, imgWidth, imgHeight);
    // setProgressMessage("Hoàn tất tạo pdf...");

    // Lưu file PDF
    pdf.save("stock-report.pdf");

    setProgressMessage("Đang hoàn tất..."); // Cập nhật tiến trình
    setLoading(false);
  };
  return (
    <div className="relative h-screen w-full overflow-y-auto bg-[#181b22]">
      <div>
        {loading && (
          <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center space-x-4 bg-black bg-opacity-60">
            <ClipLoader color="#fff" size={50} />
            <div className="mt-4 text-white">{progressMessage}</div>{" "}
            {/* Hiển thị thông báo tiến trình */}
          </div>
        )}
      </div>

      <Header stockInfo={stockInfo} />
      {/* CandleStickChart */}
      <div ref={chartRef} className="px-[4rem] py-[3.2rem]">
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
            generatePDF={generatePDF}
          />

          <Charts data={slicedData} selectedChart={selectedChart} ric={ric} />
        </div>
      </div>

      {/* Generate PDF */}

      <div
        className={`flex flex-col items-center p-5 ${!loading && "opacity-01"}`}
      >
        {/* Nội dung báo cáo */}
        {stockInfo && (
          <div className={`${!loading && "opacity"}`} ref={businessRef}>
            <BusinessSummary
              symbol={ric}
              stockInfo={stockInfo}
              setFinancialSummary={(value: string) =>
                setFinancialSummary(value)
              }
            />
          </div>
        )}

        {stockInfo && (
          <div className={`${!loading && "opacity"}`} ref={financialRef}>
            <FinancialSummary
              stockInfo={stockInfo}
              financialSummary={financialSummary}
              symbol={ric}
            />
          </div>
        )}

        {stockInfo && (
          <div className={`${!loading && "opacity"}`} ref={page3Ref}>
            <PDFPage3  stockInfo={stockInfo} />
          </div>
        )}

        <div className={`${!loading && "opacity"}`} ref={page4Ref}>
          {stockInfo && financialData && businessData && (
            <PDFPage4 symbol={ric} stockInfo={stockInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
