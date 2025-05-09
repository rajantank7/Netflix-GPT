import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addnowPlayingmovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const now_playingMovies = useSelector(
    (store) => store.movies.nowPlayingmovies
  );
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

  const getNowPlayingList = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    dispatch(addnowPlayingmovies(data.results));
  };

  useEffect(() => {
    !now_playingMovies && getNowPlayingList();
  }, []);
};

export default useNowPlayingMovies;
