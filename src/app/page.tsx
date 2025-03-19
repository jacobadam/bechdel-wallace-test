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
      <ol className="text-center my-12">
        <li>1. It has to have at least two [named] women in it</li>
        <li>2. Who talk to each other</li>
        <li>3. About something besides a man</li>
      </ol>
      <SearchBar onSearch={handleApiSearch} />
      <Results movieData={movieData} />
    </div>
  );
};

export default Home;
