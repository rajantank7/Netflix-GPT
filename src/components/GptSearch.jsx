import { BG_URL } from "../utils/constants";
import GptMovieSuggetions from "./GptMovieSuggetions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
      <img className=" absolute  h-screen w-screen opacity-80" src={BG_URL} />
      <GptSearchBar />
      <GptMovieSuggetions />
    </div>
  );
};

export default GptSearch;
