import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <div className="px-6">
        <h1 className="text-xl md:text-2xl py-2 text-white">{title}</h1>
        <div className="flex gap-3 overflow-x-scroll scrollbar-hidden">
          {movies?.map((movie) => (
            <div className="min-w-[150px] overflow-visible ">
              <MovieCard posterPath={movie?.poster_path} movieId={movie?.id} />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MovieList;
