"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Movie } from "@/types/movieTypes";
import { getMovieByTitle } from "@/utils/  bechdelTestApi";
import { decode } from "html-entities";

interface SearchBarProps {
  onSearch: (movieTitle: string, movieYear: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMovieSelection = useRef(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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
        const moviesData = await getMovieByTitle(searchTerm);
        setSearchResults(moviesData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSearchResults([]);
        setIsOpen(false);
      }
    };

    if (searchResults.length) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      clearTimeout(delayDebounceFn);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm, dropdownRef, searchResults.length]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    setSearchTerm(e.target.value);
  };

  const handleMovieSelect = (movie: Movie) => {
    isMovieSelection.current = true;
    setSearchTerm(decode(movie.title));
    onSearch(movie.title, movie.year);
    setSearchTerm("");
    setSearchResults([]);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center mt-6 sm:max-lg:mt-16">
      <form className="max-w-3xl w-9/12">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-[#ff914d] font-extrabold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="input"
            className="block w-full p-4 ps-10 text-base md:text-lg text-gray-200 border border-gray-300 rounded-lg bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff914d] focus:border-[#ff914d]"
            placeholder="Search for a movie..."
            required
            value={searchTerm}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
      </form>
      {isLoading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-600 animate-spin fill-[#ff914d] my-4"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {searchResults.length > 0 && isOpen && (
        <ul
          ref={dropdownRef}
          className="bg-black max-w-3xl w-9/12 border rounded p-2 mt-4 sm:mt-0 overflow-x-auto max-h-72"
        >
          {searchResults.map((movie, index) => (
            <li
              key={index}
              onClick={() => handleMovieSelect(movie)}
              className="cursor-pointer hover:bg-gray-50 p-2 text-[#ff914d] font-semibold"
            >
              {decode(movie.title)} ({movie.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
