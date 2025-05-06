import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingmovies: null,
    popularMovies: null,
    topratedMovies: null,
    comingSoonMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addnowPlayingmovies: (state, action) => {
      state.nowPlayingmovies = action.payload;
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
} = moviesSlice.actions;
export default moviesSlice.reducer;
