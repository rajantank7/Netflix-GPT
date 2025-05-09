import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topratedMovies = useSelector((store) => store.movies.topratedMovies);
  const url = "https://api.themoviedb.org/3/movie/top_rated";

  const getTopRatedMovies = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    dispatch(addTopRatedMovies(data.results));
  };

  useEffect(() => {
    !topratedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
