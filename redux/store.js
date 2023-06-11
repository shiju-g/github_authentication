"use client";
import { configureStore } from "@reduxjs/toolkit";
import authUser from "./features/auth-user";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authUser,
  },
});
