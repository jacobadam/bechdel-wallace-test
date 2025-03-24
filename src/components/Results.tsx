"use client";
import React from "react";
import Image from "next/image";
import { Movie } from "@/types/movieTypes";

interface MovieDataProps {
  movieData: Movie[];
}

const Results: React.FC<MovieDataProps> = ({ movieData }) => {
  return (
    <div className="text-center mt-4">
      {movieData && movieData.length > 0 ? (
        <ul key={movieData[0].id}>
          <li>{movieData[0].title}</li>
          <li>{movieData[0].year}</li>
          {movieData[0].rating === 3 ? (
            <li>
              <div className="flex justify-center items-center">
                <Image src="/true.png" width={100} height={100} alt="Pass" />
              </div>
            </li>
          ) : (
            <li>
              <div className="flex justify-center items-center">
                <Image
                  src="/false.png"
                  width={100}
                  height={100}
                  alt="NotPass"
                />
              </div>
            </li>
          )}
        </ul>
      ) : (
        <div>No movie data available.</div>
      )}
    </div>
  );
};
export default Results;
