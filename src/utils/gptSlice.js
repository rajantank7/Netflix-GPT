import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    showVideo: false,
    cardId: null,
    movieNames: null,
    movieResults: null,
    searchTitle: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptSearch: (state, action) => {
      state.showGptSearch = action.payload;
    },
    setShowVideo: (state, action) => {
      state.showVideo = action.payload;
    },
    setCardId: (state, action) => {
      state.cardId = action.payload;
    }, // <-- this comma is okay
    addGptMoviesResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
    setMovieResults: (state, action) => {
      state.movieResults = action.payload;
    },
  }, // ✅ This closing brace was missing
});

export const {
  toggleGptSearch,
  setMovieResults,
  setGptSearch,
  setShowVideo,
  setCardId,
  addGptMoviesResults,
  setSearchTitle,
} = gptSlice.actions;
export default gptSlice.reducer;
