import React from "react";
import { Img_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div>
      <img className="w-34 inline-block" src={Img_URL + posterPath} alt="" />
    </div>
  );
};

export default MovieCard;
