import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { setCardId, setShowVideo } from "../utils/gptSlice";

const Video = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const dispatch = useDispatch();

  useMovieTrailer(movieId);

  const handleClick = () => {
    dispatch(setShowVideo(false));
    dispatch(setCardId(null));
  };

  if (!trailerVideo) return null;
  return (
    <div>
      <div
        className="absolute text-white cursor-pointer left-0 right-0 top-2 flex justify-center"
        onClick={handleClick}
      >
        ❌(close video)
      </div>
      <iframe
        className="w-screen h-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&loop=1&playlist=${trailerVideo.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
