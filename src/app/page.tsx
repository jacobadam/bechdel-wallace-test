"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Results";
import { getMovieByTitle } from "@/utils/  bechdelTestApi";
import { Movie } from "@/types/movieTypes";

const Home: React.FC = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const handleApiSearch = async (movieTitle: string) => {
    try {
      const data = await getMovieByTitle(movieTitle);
      setMovieData(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-screen">
      <div className="flex flex-row mx-auto w-auto items-center justify-between ">
        <div className="mt-4 ml-4 text-xs sm:text-base">Logo</div>
        <h1 className="relative flex-1 font-extrabold text-center text-lg sm:text-3xl mt-4 justify-center">
          Bechdel Test Checker
        </h1>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 mr-4 text-xs sm:text-base"
          href="https://bechdeltest.com/"
        >
          About
        </Link>
      </div>

      <div className="flex flex-col items-center content-center my-12">
        <ol>
          <li className="text-xs sm:text-lg">
            <b>1.</b> It has to have at least two [named] women in it
          </li>
          <li className="text-xs sm:text-lg ml-8">
            <b>2.</b> Who talk to each other
          </li>
          <li className="text-xs sm:text-lg ml-16">
            <b>3.</b> About something besides a man
          </li>
        </ol>
      </div>
      <SearchBar onSearch={handleApiSearch} />
      <Results movieData={movieData} />
    </div>
  );
};

export default Home;
