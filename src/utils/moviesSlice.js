import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingmovies: null,
    popularMovies: null,
    topratedMovies: null,
    comingSoonMovies: null,
    trailerVideo: null,
    showInfocard: false,
  },
  reducers: {
    addnowPlayingmovies: (state, action) => {
      state.nowPlayingmovies = action.payload;
    },
    setshowInfocard: (state, action) => {
      state.showInfocard = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topratedMovies = action.payload;
    },
    addComingSoonMovies: (state, action) => {
      state.comingSoonMovies = action.payload;
    },
  },
});

export const {
  addnowPlayingmovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addComingSoonMovies,
  setshowInfocard,
} = moviesSlice.actions;
export default moviesSlice.reducer;
