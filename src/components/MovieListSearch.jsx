import React from "react";
import MovieCard from "./MovieCard";

const MovieListSearch = ({ title, movies, name }) => {
  return (
    <div>
      <div className="px-6">
        <h1 className="text-2xl py-2 text-white">{title}</h1>
        <div className="flex gap-3 flex-wrap overflow-x-scroll scrollbar-hidden">
          {movies?.map((movie) => (
            <div className="min-w-[155px] ">
              <MovieCard
                posterPath={movie?.poster_path}
                movieId={movie?.id}
                name={movie?.title}
              />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MovieListSearch;
