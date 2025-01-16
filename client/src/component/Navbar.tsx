import React from "react";
import { IoIosHelp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Navbar = ({
  category,
  setCategory,
}: {
  category: number;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-[3.2rem]  bg-bg_secondary flex flex-row justify-between items-center">
      <div className="flex flex-row">
        {navbarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
            
              setCategory(index);
              navigate(index === 0 ? "/" : "/model");
            }}
            className={`text-white text-[1.2rem] h-full p-[1rem] 
          font-bold ${
            index === category && "bg-active"
          } hover:bg-active duration-300 hover:cursor-pointer `}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center ">
        <h4 className="text-[1.2rem] font-light text-white px-[1rem]">
          {new Date().toISOString()}{" "}
        </h4>

        <div
          className={`text-white text-[1.2rem] h-full p-[1rem] 
          font-bold  hover:bg-active duration-300 items-center gap-x-[0.4rem] flex flex-row hover:cursor-pointer `}
        >
          <div className="text-secondary  bg-white rounded-full">
            <IoIosHelp size={16} />
          </div>
          Help
        </div>
        <div
          className={`text-white text-[1.2rem] h-full p-[1rem] 
          font-bold  hover:bg-active duration-300 hover:cursor-pointer `}
        >
          Register
        </div>
        <div
          className={`text-white text-[1.2rem] h-full p-[1rem] 
          font-bold  hover:bg-active duration-300 hover:cursor-pointer `}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const navbarItems = ["Chủ đề 1", "Chủ đề 2"];
