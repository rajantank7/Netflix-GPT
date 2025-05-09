import React from "react";
import { Img_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setCardId, setShowVideo } from "../utils/gptSlice";

const MovieCard = ({ posterPath, movieId, name }) => {
  const dispatch = useDispatch();
  const handleCardClick = () => {
    dispatch(setCardId(movieId));
    dispatch(setShowVideo(true));
  };
  if (!posterPath) return null;
  return (
    <div className="transform transition duration-300 hover:scale-125 hover:shadow-xl">
      <img
        className="w-38 inline-block cursor-poniter rounded-[6px]"
        src={Img_URL + posterPath}
        onClick={handleCardClick}
      />
      <h1 className="text-white">{name}</h1>
    </div>
  );
};

export default MovieCard;
