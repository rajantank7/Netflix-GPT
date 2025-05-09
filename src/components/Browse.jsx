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

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useComingSoonMovies();

  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const showVideo = useSelector((store) => store.gpt?.showVideo);
  const movies = useSelector((store) => store.movies?.nowPlayingmovies);
  const cardId = useSelector((store) => store.gpt?.cardId);

  if (!movies) return null;

  const { id } = movies[10];
  console.log(id);

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
