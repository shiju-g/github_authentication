import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

export const auth = createSlice({
  name: "auth-user",
  initialState: initialState,
  reducers: {
    loginIn: (state, actions) => {
      return {
        data: actions.payload,
      };
    },
  },
});

export const { loginIn } = auth.actions;
export default auth.reducer;
