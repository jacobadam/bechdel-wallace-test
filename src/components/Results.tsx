"use client";
import React from "react";
import { Movie } from "@/types/movieTypes";
import ParticlesBackground from "./ParticlesBackground";
import { decode } from "html-entities";

interface MovieDataProps {
  movieData: Movie[];
}

const Results: React.FC<MovieDataProps> = ({ movieData }) => {
  return (
    <div className="text-center mt-4">
      {movieData && movieData.length > 0 && (
        <ul>
          {movieData.map((movie) => (
            <li key={movie.id}>
              <div>{decode(movie.title)}</div>
              <div>{movie.year}</div>
              {movie.rating === 3 ? (
                <div>
                  <div className="flex justify-center items-center">
                    <ParticlesBackground />
                    TRUE!!!
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center">
                    FALSE!!!
                  </div>
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
