"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Results";
import AboutInformation from "@/components/AboutInformation";
import Footer from "@/components/Footer";
import { getMovieByTitle } from "@/utils/bechdelTestApi";
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
        <div>
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

        <div className="mt-4 mr-8 text-xs sm:text-base">
          <AboutInformation />
        </div>
      </div>

      <h1 className="relative flex-1 text-center text-3xl xs:text-4xl sm:text-5xl 2xl:text-6xl mt-16 sm:max-lg:mt-16 lg:mt-0 2xl:mt-12 mb-4 sm:mb-8 justify-center">
        The Bechdel-Wallace Test
      </h1>

      <div className="flex flex-col items-center text-center sm:max-lg:mt-16 mt-8 mb-4">
        <ol>
          <li className="text-sm sm:text-lg mb-2 font-bold">
            How a film passes the Bechdel-Wallace test:
          </li>
          <li className="text-sm sm:text-lg italic">
            <b>1.</b> It has to have at least two named women in it
          </li>
          <li className="text-sm sm:text-lg italic">
            <b>2.</b> Who talk to each other
          </li>
          <li className="text-sm sm:text-lg italic">
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
