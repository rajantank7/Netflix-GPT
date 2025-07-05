import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import ai from "../utils/gemini";
import { useRef } from "react";
import { options } from "../utils/constants";
import {
  addGptMoviesResults,
  setSearchTitle,
  setMovieResults,
} from "../utils/gptSlice";

const GptSearchBar = () => {
  const Lang = useSelector((store) => store.configLang?.Lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      options
    );

    const data = await response.json();

    const mainMovie = data.results.find((movie) => movie.poster_path !== null);

    return mainMovie;
  };

  const handleGptSearchClick = async () => {
    dispatch(setSearchTitle(null));
    dispatch(setMovieResults(null));
    const query =
      "Act as a movie recommodetion system and suggest some movies for the query : " +
      searchText.current.value +
      "only give me names of 24 movies , comma seperated and aony give me movie names no harding like Here are 24 Hindi action movie recommendations or anthing like these and remove";
    searchText.current.value;
    dispatch(setSearchTitle(searchText.current.value));
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
    });

    const gptResults = response.text.split(",").map((ele) => ele.trim());
    console.log(gptResults);

    const promiseArray = gptResults.map((movie) => searchMovieTmdb(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMoviesResults({ movieNames: gptResults, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[30%] md:pt-[10%] z-10 relative">
      <form
        className="flex md:w-[700px] mx-2  md:mx-auto z-10 bg-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-2 m-2.5 md:m-3 grow text-black bg-white"
          type="text"
          placeholder={lang[Lang].languagePlaceholder}
        />
        <button
          className="py-2 px-4 md:px-4 m-2.5 md:m-3 bg-red-600 text-white rounded-lg mx-4 cursor-pointer "
          onClick={handleGptSearchClick}
        >
          {lang[Lang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
