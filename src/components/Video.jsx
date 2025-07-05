import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { setCardId, setShowVideo } from "../utils/gptSlice";
import { addTrailerVideo } from "../utils/moviesSlice";

const Video = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const dispatch = useDispatch();

  useMovieTrailer(movieId);

  const handleClick = () => {
    dispatch(setShowVideo(false));
    dispatch(setCardId(null));
  };

  if (!trailerVideo) {
    dispatch(addTrailerVideo(null)); // This ensures trailerVideo !== undefined
  }

  if (trailerVideo === undefined) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Loading trailer...</p>
      </div>
    );
  }

  if (trailerVideo === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white text-lg">
        <p className="text-xl font-semibold">
          Video not available for this movie.
        </p>
        <button
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200"
          onClick={handleClick}
        >
          🔙 Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className="absolute text-white cursor-pointer left-0 right-0 top-2 w-fit mx-30 md:mx-auto"
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
