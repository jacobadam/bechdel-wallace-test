"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Movie } from "@/types/movieTypes";
import { getMovieByTitle } from "@/utils/  bechdelTestApi";

interface SearchBarProps {
  onSearch: (movieTitle: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // const [searchedMovie, setSearchedMovie] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMovieSelection = useRef(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    if (isMovieSelection.current) {
      isMovieSelection.current = false;
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieByTitle(searchTerm);
        console.log(data);
        setSearchResults(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchButtonClick = () => {
    onSearch(searchTerm);
    setSearchResults([]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMovieSelect = (movie: Movie) => {
    isMovieSelection.current = true;
    setSearchTerm(movie.title);
    setSearchResults([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-80 gap-1">
        <input
          type="search"
          id="input"
          className="block w-full max-w-xs px-4 py-2 text-base font-normal shadow-xs text-white bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed text-center"
          placeholder="Search for a movie..."
          required
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearchButtonClick}
          className="py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {searchResults.length > 0 && (
        <ul className="w-80 border rounded p-2">
          {searchResults.map((movie, index) => (
            <li
              key={index}
              onClick={() => handleMovieSelect(movie)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {movie.title} ({movie.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
