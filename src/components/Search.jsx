import React, { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { GoLocation } from "react-icons/go";

import { usedebounced } from "./utils/debounced";

const Search = ({ setTerm, setUnit }) => {
  const [search, setSearch] = useState("");

  const debounceTerm = usedebounced(search, 1000);

  setTerm(debounceTerm);

  const submitData = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex w-full justify-evenly items-center my-2">
      <div className="w-full mx-auto flex items-center sm:justify-center space-x-6">
        <form onSubmit={submitData}>
          <input
            type="text"
            placeholder="Search...."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full md:w-72 p-2 text-md capitalize text-black outline-none focus:outline-none shadow-gray-500 shadow-md rounded-sm"
          />
        </form>
        <CiSearch className="text-white font-semibold cursor-pointer text-2xl hidden md:block" />
        <GoLocation className="text-white font-semibold cursor-pointer text-xl hidden md:block" />
        <div className="text-xl  font-bold flex items-center justify-between">
          <button
            className="text-white text-xl"
            onClick={() => setUnit("metric")}
          >
            &#176;C
          </button>
          <p className="mx-2">|</p>
          <button
            className="text-white text-xl"
            onClick={() => setUnit("standard")}
          >
            &#176;F
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
