"use client";

import React from "react";
import { Movie } from "@/types/movieTypes";
import ParticlesBackground from "./ParticlesBackground";
import { decode } from "html-entities";

interface MovieDataProps {
  movieData: Movie[];
  selectedMovieYear: number | null;
}

const Results: React.FC<MovieDataProps> = ({
  movieData,
  selectedMovieYear,
}) => {
  const filteredMovieData = movieData.filter(
    (movie) => movie.year === selectedMovieYear
  );
  return (
    <div className="text-center mt-6 2xl:mt-16">
      {filteredMovieData && filteredMovieData.length > 0 && (
        <ul>
          {filteredMovieData.map((movie) => (
            <li key={movie.id}>
              <div className="text-base xs:text-2xl 2xl:text-3xl font-extrabold">
                {decode(movie.title)}, {movie.year}
              </div>
              {movie.rating === 3 ? (
                <div>
                  <div className="flex justify-center items-center">
                    <ParticlesBackground />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <video
                    src="/fail-black.mp4"
                    autoPlay
                    muted
                    loop={false}
                    playsInline
                    width={460}
                    height={460}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Results;
