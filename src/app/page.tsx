"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Results";
import AboutInformation from "@/components/AboutInformation";
import Footer from "@/components/Footer";
import { getMovieByTitle } from "@/utils/  bechdelTestApi";
import { Movie } from "@/types/movieTypes";

const Home: React.FC = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [selectedMovieYear, setSelectedMovieYear] = useState<number | null>(
    null
  );

  const handleApiSearch = async (movieTitle: string, movieYear: number) => {
    setSelectedMovieYear(movieYear);

    try {
      const data = await getMovieByTitle(movieTitle);
      setMovieData(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-screen min-h-screen">
      <div className="flex flex-row mx-auto w-auto items-center justify-between ">
        <div className="mt-2">
          <video
            src="/black-logo.mp4"
            autoPlay
            muted
            loop={false}
            playsInline
            width={80}
            height={80}
          />
        </div>

        <h1 className="relative flex-1 font-base text-center text-3xl sm:text-6xl mt-8 mb-4 justify-center">
          Bechdel Test
        </h1>

        <div className="mt-4 mr-8 text-xs sm:text-base">
          <AboutInformation />
        </div>
      </div>

      <div className="flex flex-col items-center text-center my-8">
        <ol>
          <li className="text-xs sm:text-xl mb-2 font-bold">
            How a film passes the Bechdel test:
          </li>
          <li className="text-xs sm:text-lg italic">
            <b>1.</b> It has to have at least two [named] women in it
          </li>
          <li className="text-xs sm:text-lg italic">
            <b>2.</b> Who talk to each other
          </li>
          <li className="text-xs sm:text-lg italic">
            <b>3.</b> About something besides a man
          </li>
        </ol>
      </div>
      <SearchBar onSearch={handleApiSearch} />
      <Results movieData={movieData} selectedMovieYear={selectedMovieYear} />
      <Footer />
    </div>
  );
};

export default Home;
