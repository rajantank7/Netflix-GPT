import { createSlice } from "@reduxjs/toolkit";

const cofigLang = createSlice({
  name: "configLang",
  initialState: {
    Lang: "english",
  },
  reducers: {
    setLang: (state, action) => {
      state.Lang = action.payload;
    },
  },
});

export const { setLang } = cofigLang.actions;
export default cofigLang.reducer;
