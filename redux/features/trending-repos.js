import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const trendingRepos = createSlice({
  name: "trending-repos",
  initialState: initialState,
  reducers: {
    trendingrReposAdd: (state, actions) => {
      return {
        repo: actions.payload,
      };
    },
  },
});

export const { trendingrReposAdd } = trendingRepos.actions;
export default trendingRepos.reducer;
