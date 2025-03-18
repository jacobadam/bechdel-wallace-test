import React, { useState } from "react";

export default function SearchBar() {
  const [searchedMovie, setSearchedMovie] = useState("");

  const handleSearch = () => {};

  const handleInputChange = () => {};

  return (
    <div className="mt-4 text-center flex flex-row justify-center gap-2">
      <input
        type="search"
        id="input"
        className="block w-full max-w-xs px-4 py-2 text-base font-normal shadow-xs text-white bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed text-center"
        placeholder="Search for a movie"
        required
        onChange={handleInputChange}
      ></input>
      <button
        onClick={handleSearch}
        className="py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  );
}
