import { useSelector } from "react-redux";
import VideoBackground from "./Videobackground";
import VideoTitle from "./VideoTitle";
import MainMovieDetails from "./MainMovieDetails";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies);
  const showinfo = useSelector((store) => store.movies.showInfocard);
  const nowPlaying = movies?.nowPlayingmovies;

  if (!nowPlaying) return;

  const mainMovie = nowPlaying[2];
  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} movieId={id} />
      <VideoBackground movieId={id} />
      {showinfo && <MainMovieDetails movie={mainMovie} />}
    </div>
  );
};

export default MainContainer;
