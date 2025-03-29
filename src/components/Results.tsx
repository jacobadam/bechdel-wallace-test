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
    <div className="text-center mt-4">
      {filteredMovieData && filteredMovieData.length > 0 && (
        <ul>
          {filteredMovieData.map((movie) => (
            <li key={movie.id}>
              <div className="text-2xl font-extrabold">
                {decode(movie.title)}
              </div>
              <div className="text-xl font-bold">{movie.year}</div>
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
                    width={480}
                    height={480}
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
