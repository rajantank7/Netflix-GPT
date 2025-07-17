import { useDispatch } from "react-redux";

import { setShowVideo } from "../utils/gptSlice";
import { setshowInfocard } from "../utils/moviesSlice";

const VideoTitle = ({ title, overview, movieId }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setShowVideo(true));
  };

  const handleClick = () => {
    dispatch(setshowInfocard(true));
  };
  return (
    <div className="w-full  md:block aspect-[16/9] pt-[25%] pb-10 px-3 md:px-8 absolute text-white bg-gradient-to-r from-black/75">
      <h1 className="md:text-[40px] text-[22px] font-bold ">{title}</h1>
      <p className="w-1/4 max-h-27 py-1 text-sm hidden md:block line-clamp-5">
        {overview}
      </p>
      <div className="pt-1 md:pt-3">
        <button
          className="p-1 px-2 md:p-2 md:px-8 text-[10px] md:text-base cursor-pointer bg-white text-black rounded-md  hover:hover:bg-white/80"
          onClick={handlePlayClick}
        >
          ▶️Play
        </button>
        <button
          onClick={handleClick}
          className="p-1 px-2 md:p-2 md:px-8 mx-2 text-[10px] md:text-base  cursor-pointer bg-gray-500  hover:hover:bg-gray-500/80 text-white rounded-md "
        >
          <img
            className="w-2.5 h-2.5 md:w-5 md:h-5 relative bottom-0.5 inline"
            src="https://img.icons8.com/ios/50/FFFFFF/info--v1.png"
          />{" "}
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
