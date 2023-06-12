"use client";
import { configureStore } from "@reduxjs/toolkit";
import authUser from "./features/auth-user";
import trendingRepos from "./features/trending-repos";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authUser,
    trendingRepos,
  },
});
