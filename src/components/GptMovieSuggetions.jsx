import { useSelector } from "react-redux";

import MovieListSearch from "./MovieListSearch";

const GptMovieSuggetions = () => {
  const searchTitle = useSelector((store) => store.gpt.searchTitle);
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!searchTitle) return;
  if (!movieResults) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-15 h-15 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="z-10 relative bg-black m-3 pt-2 ">
      <MovieListSearch title={""} movies={movieResults} name={movieNames} />
    </div>
  );
};

export default GptMovieSuggetions;
