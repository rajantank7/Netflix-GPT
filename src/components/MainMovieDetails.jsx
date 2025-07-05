import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setshowInfocard } from "../utils/moviesSlice";
import { setShowVideo } from "../utils/gptSlice";

const MainMovieDetails = ({ movie }) => {
  const dispatch = useDispatch();
  const showinfo = useSelector((store) => store.movies.showInfocard);
  if (!movie) return null;

  const { title, release_date, overview, poster_path } = movie;
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleClick = () => {
    dispatch(setshowInfocard(false));
  };

  const handelPlay = () => {
    dispatch(setShowVideo(true));
  };
  return (
    <div className="flex flex-col md:flex-row bg-gray-900 absolute top-12 md:top-24 right-0 left-0 mx-auto z-20 text-white rounded-2xl overflow-hidden shadow-lg w-[90%] md:max-w-4xl hover:scale-[1.02] transition-transform duration-300">
      <img
        src={imageBaseUrl + poster_path}
        alt={title}
        className="w-full md:w-1/3 h-64 md:h-auto object-cover"
      />
      <div className="p-4 md:p-6 flex flex-col justify-between w-full md:w-2/3 relative">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
          <p className="text-xs md:text-sm text-gray-400 mb-2">
            Release Date: {release_date}
          </p>
          <p className="text-sm md:text-base text-gray-300 line-clamp-4">
            {overview}
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={handelPlay}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm md:text-base"
          >
            ▶️ Play Movie
          </button>
        </div>
        <span
          className="absolute right-4 top-4 text-xl cursor-pointer"
          onClick={handleClick}
        >
          ❌
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-900 absolute top-50 right-65 z-20 text-white rounded-2xl overflow-hidden shadow-lg w-full max-w-4xl hover:scale-[1.02] transition-transform duration-300">
      <img
        src={imageBaseUrl + poster_path}
        alt={title}
        className="w-1/3 object-cover h-auto"
      />
      <div className="p-6 flex flex-col justify-between w-2/3">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-sm text-gray-400 mb-2">
            Release Date: {release_date}
          </p>
          <p className="text-sm text-gray-300 line-clamp-4">{overview}</p>
        </div>
        <div className="mt-4">
          <button
            onClick={handelPlay}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Play movie
          </button>
        </div>
        <span
          className="absolute right-5 top-5 cursor-pointer"
          onClick={handleClick}
        >
          ❌
        </span>
      </div>
    </div>
  );
};

export default MainMovieDetails;
