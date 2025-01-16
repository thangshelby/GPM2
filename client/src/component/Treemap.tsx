import { useState } from "react";

const Treemap = () => {
  const [countrySelected, setCountrySelected] = useState("Japan");
  const [selectedValue, setSelectedValue] = useState(2000);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <div className="w-full h-[4rem] bg-primary flex flex-row justify-center items-center">
        <div className="w-[20%] h-full"></div>
        <div className="w-[80%] h-full flex flex-row px-[1.6rem] items-center">
          <p className="text-white text-start text-[1.4rem] font-medium">
            The treemap illustrates the stock markets of South Korea and Japan
            from 2000 to 2023, categorized by sectors.
          </p>
        </div>
      </div>
      <div className="w-[100%] bg-bg_secondary h-[400px] flex flex-row">
        <div className="w-[20%] px-[1.2rem] py-[1.6rem] flex flex-col gap-y-[3.2rem]">
          <div className="flex flex-row">
            <span className="text-[2rem] text-primary font-extrabold">
              Tree Map Filter
            </span>
          </div>
          <div className="flex flex-col gap-y-[0.4rem]">
            <div className="flex flex-row">
              <label className="text-text_primary text-[1.2rem] font-bold">
                Country Filter
              </label>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-x-[0.8rem]">
                <img
                  className="w-20 h-12 object-cover"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/640px-Flag_of_Japan.svg.png"
                />
                <input
                  onChange={() => setCountrySelected("Japan")}
                  checked={countrySelected === "Japan"}
                  type="radio"
                />
              </div>

              <div className="flex flex-row items-center gap-x-[0.8rem]">
                <img
                  className="w-20 h-12 object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5aQyFMrM-LUX6EeNW44KYLz471aawAa6bMg&s"
                />
                <input
                  onChange={() => setCountrySelected("Korea")}
                  checked={countrySelected === "Korea"}
                  type="radio"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-[0.4rem]">
            <div className="flex flex-row">
              <label className="text-text_primary text-[1.2rem] font-bold">
                Country Filter
              </label>
            </div>

            <select
              className="w-full bg-[#4a505f] border-[0.1rem] border-text_primary text-white p-[0.8rem]
       outline-none text-[1.4rem] font-bold  max-h-[10rem]
       rounded-lg shadow-sm hover:bg-[#3a414d] focus:ring-2 focus:ring-[#5b636f] transition-all"
              value={selectedValue}
              onChange={handleChange}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year} Year
                </option>
              ))}
            </select>
          </div>
        </div>

        <iframe
          src={`http://127.0.0.1:5000/dash/?country=${countrySelected}&year=${selectedValue}`}
          width="80%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Treemap;

const yearOptions = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
];
