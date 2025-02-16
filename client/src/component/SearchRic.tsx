import React, { useEffect } from "react";
import { useState,useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchStock } from "../api";

const SearchRic = () => {

    useEffect(()=>{

    },[])


    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  return (
    <div className="flex flex-row items-center gap-x-[0.8rem]
    rounded-xl bg-[#262626] px-[0.8rem] py-[0.6rem] w-[50%] focus-within:border-[0.1rem] focus-within:border-white focus-within:bg-[#141414]">
      <FaSearch className="text-white" size={12} />

      <input
        type="text"
        className="bg-transparent text-[1.4rem] text-white outline-none placeholder:text-[1.6rem]"
        placeholder="Tìm kiếm"
      />
    </div>
  );
};

export default SearchRic;
