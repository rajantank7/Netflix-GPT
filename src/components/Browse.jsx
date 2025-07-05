import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularList";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useComingSoonMovies from "../hooks/useComingSoon.Movies";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";
import Video from "./Video";
import { useEffect, useRef, useState } from "react";
import MainMovieDetails from "./MainMovieDetails";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useComingSoonMovies();

  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const showVideo = useSelector((store) => store.gpt?.showVideo);
  const movies = useSelector((store) => store.movies?.nowPlayingmovies);
  const cardId = useSelector((store) => store.gpt?.cardId);

  // if (!movies || movies.length === 0) {
  //   return (
  //     <div className="text-center text-red-500 mt-10 text-xl">
  //       ⚠️ Failed to load movies. TMDB may be blocked in your region. Please use
  //       a VPN.
  //     </div>
  //   );
  // }
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg px-4">
        ⚠️ Failed to load movies. TMDB might be blocked in your region.
        <br />
        Try using a VPN to fix this issue. <br />
        We recommend{" "}
        <a
          href="https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          Free VPN for Chrome
        </a>{" "}
        (Chrome Extension).
      </div>
    );
  }


  return (
    <div>
      {showVideo ? (
        <Video movieId={cardId == null ? id : cardId} />
      ) : (
        <>
          <Header />
          {showGptSearch ? (
            <GptSearch />
          ) : (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
