import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const url = "https://api.themoviedb.org/3/tv/top_rated";

  const getPopularMovies = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    dispatch(addPopularMovies(data.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
