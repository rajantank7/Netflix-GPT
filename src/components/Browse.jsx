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

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg px-4">
        ⚠️ Failed to load movies. TMDB might be blocked in your region.
        <br />
        Try using a VPN to fix this issue. <br />
        We recommend:
        <ul className="mt-2 list-disc list-inside text-blue-400 underline">
          <li>
            <a
              href="https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno"
              target="_blank"
              rel="noopener noreferrer"
            >
              Free VPN for Chrome (Desktop Extension)
            </a>
          </li>
          <li>
            <a
              href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Turbo VPN (Android App)
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/us/app/turbo-vpn-private-browser/id1501731643"
              target="_blank"
              rel="noopener noreferrer"
            >
              Turbo VPN (iOS App)
            </a>
          </li>
        </ul>
      </div>
    );
  }

  // if (!movies || movies.length === 0) {
  //   return (
  //     <div className="text-center text-red-500 mt-10 text-lg px-4">
  //       ⚠️ Failed to load movies. TMDB might be blocked in your region.
  //       <br />
  //       Try using a VPN to fix this issue. <br />
  //       We recommend{" "}
  //       <a
  //         href="https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="text-blue-400 underline"
  //       >
  //         Free VPN for Chrome
  //       </a>{" "}
  //       (Chrome Extension).
  //     </div>
  //   );
  // }

  const { id } = movies[0];

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
