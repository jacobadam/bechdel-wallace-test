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
          <li key={movieData[0].id}>
            <div className="text-2xl font-extrabold">
              {decode(movieData[0].title)}
            </div>
            <div className="text-xl font-bold">{movieData[0].year}</div>
            {movieData[0].rating === 3 ? (
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
        </ul>
      )}
    </div>
  );
};
export default Results;
