"use client";

import React, { useState } from "react";
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
    <div>
      <h1 className="font-extrabold text-center text-3xl mt-4">
        Bechdel Test Checker
      </h1>

      <div className="flex flex-col items-start text-left my-12 mx-auto max-w-fit">
        <ol className="list-inside pl-0">
          <li className="relative mb-1 left-0">
            <b>1</b>. It has to have at least two [named] women in it
          </li>
          <li className="relative mb-1 left-9">2. Who talk to each other</li>
          <li className="relative mb-1 left-18">
            3. About something besides a man
          </li>
        </ol>
      </div>
      <SearchBar onSearch={handleApiSearch} />
      <Results movieData={movieData} />
    </div>
  );
};

export default Home;
