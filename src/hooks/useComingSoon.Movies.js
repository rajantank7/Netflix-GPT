import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addComingSoonMovies } from "../utils/moviesSlice";

const useComingSoonMovies = () => {
  const dispatch = useDispatch();
  const url = "https://api.themoviedb.org/3/movie/upcoming";

  const getomingSoonMovies = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    dispatch(addComingSoonMovies(data.results));
  };

  useEffect(() => {
    getomingSoonMovies();
  }, []);
};

export default useComingSoonMovies;
