"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Results";
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
        <h1 className="relative flex-1 font-extrabold text-center text-lg sm:text-3xl mt-2 justify-center">
          Bechdel Test Checker
        </h1>

        <div className="mt-4 mr-8 text-xs sm:text-base">
          <div className="group relative">
            <button>
              <b>About</b>
            </button>

            <div className="absolute right-full top-full mb-2 hidden group-hover:block bg-black text-white text-sm rounded p-4 min-w-96 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 border border-white whitespace-normal text-center">
              The Bechdel-Wallace Test, often known as the Bechdel Test, is a
              basic measure assessing female representation in films. It
              stipulates three key criteria: firstly, the film must feature at
              least two named female characters, secondly, these characters must
              engage in conversation with each other, and thirdly, their
              dialogue must center on a topic other than men. This simple test,
              originating from Alison Bechdel&apos;s 1985 comic strip
              &quot;Dykes to Watch Out For,&quot; highlights the frequent lack
              of meaningful female interaction in cinematic narratives.
            </div>
          </div>
        </div>
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
      <Results movieData={movieData} selectedMovieYear={selectedMovieYear} />
      <Footer />
    </div>
  );
};

export default Home;
