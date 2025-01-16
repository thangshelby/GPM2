import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import ReactLoading from "react-loading";
import { FaSearch } from "react-icons/fa";
const Model = ({setRic}:{setRic:(ric:string)=>void}) => {
  const tableHeaders = [
    "Công ty",
    "Lĩnh vực",
    "Giá hôm qua",
    "Giá dự đoán",
    "Thao tác",
  ];
  const [data, setData] = useState<
    {
      sector: string;
      name: string;
      ric: string;
      old_price: number;
      new_price: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/get_companies/Japan");
      const data = await response.json();
      setData(data.data);
      
    };
    fetchData();
  }, []);

  const types = ["Tất cả", "Tăng", "Giảm"];
  const [selectedType, setSelectedType] = useState("Tất cả");
  const [validData, setValidData] = useState<
    {
      sector: string;
      name: string;
      ric: string;
      old_price: number;
      new_price: number;
    }[]
  >([]);
  useEffect(() => {
    if (selectedType === "Tất cả") {
      setValidData(data);
    }

    if (selectedType === "Tăng") {
      const newData = data.filter(
        (company) => company.new_price > company.old_price
      );
      setValidData(newData);
    }
    if (selectedType === "Giảm") {
      const newData = data.filter(
        (company) => company.new_price < company.old_price
      );
      setValidData(newData);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [data, selectedType]);

  return (
    <div className="w-full p-[1.6rem] overflow-y-auto bg-[#141414]">
      <div className="w-full  rounded-t-2xl overflow-hidden shadow-lg flex flex-col gap-y-[1.6rem]">
        <header className="text-white font-bold text-[2.6rem] text-start">
          Dự đoán giá cổ phiểu theo từng ngành vào cuối năm 2025
        </header>

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-x-[1.6rem] mt-[1rem]">
            {types.map((type, index) => (
              <div
                key={index}
                onClick={() => {
                  setLoading(true);
                  setSelectedType(type);
                }}
                className={`text-white font-bold text-[1.6rem]  hover:cursor-pointer ${
                  type == selectedType
                    ? "text-[#30bf87] border-b-[0.2rem] border-white"
                    : "opacity-50"
                } hover:text-[#30bf87] hover:opacity-100 duration-200`}
              >
                {type}
              </div>
            ))}
          </div>


            {/* INPUT SEARCH */}
          <div className="flex w-[20%] flex-row gap-x-[0.8rem] items-center
           bg-[#262626] px-[1rem] py-[0.8rem] rounded-xl focus-within:bg-[#141414] focus-within:border-white focus-within:border-[0.1rem] ">
              <FaSearch className="text-white " size={12}/>

            <input
            type="text"
            className=" text-[1.6rem] text-white  bg-transparent placeholder:text-[1.6rem] outline-none"
            placeholder="Tìm kiếm"
            />

          </div>
        </div>
        {loading ? (
          <div className="w-full 
          text-[#991f29]
          flex h-[400px] justify-center items-center">
            <ReactLoading
              delay={100}
              type={"spin"}
              color={"#fff"}
              height={40}
              width={40}
            />
          </div>
        ) : (
          <table className="min-w-full  ">
            <thead className="bg-[#1f1f1f]">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`px-[1.6rem] py-[0.8rem] text-left    ${
                      header === "Thao tác" && " text-end"
                    }`}
                  >
                    <div className="flex flex-row items-center gap-x-[0.8rem]">
                      <span
                        className={`${
                          header === "Thao tác" && "w-[20rem] text-end"
                        } text-white uppercase text-[1.2rem] font-semibold
                 hover:cursor-pointer`}
                      >
                        {header}
                      </span>
                      {header !== "Thao tác" && header !== "Công ty" && (
                        <div className="flex flex-col relative ">
                          <FaSortUp
                            className="text-[#6d6d6d] absolute"
                            size={12}
                          />
                          <FaSortDown className="text-[#6d6d6d]" size={12} />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className=" bg-[#141414] ">
              {validData.length > 0 &&
                validData.map((company, index) => (
                  <TableRow key={index} 
                  setRic={setRic}
                  index={index} rowValue={company} />
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Model;
