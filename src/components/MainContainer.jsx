import { useSelector } from "react-redux";
import VideoBackground from "./Videobackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies);
  const nowPlaying = movies?.nowPlayingmovies;

  

  if (!nowPlaying) return;

  const mainMovie = nowPlaying[8];
  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
