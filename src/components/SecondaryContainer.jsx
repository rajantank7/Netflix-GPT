import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingmovies);
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies?.topratedMovies);
  const comingSoonMovies = useSelector(
    (store) => store.movies?.comingSoonMovies
  );

  return (
    <div className="bg-black">
      <div className="-mt-42 relative z-10">
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Top Rated" movies={topRatedMovies} />
        <MovieList title="Popular" movies={popularMovies} />
        <MovieList title="Coming soon" movies={comingSoonMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
