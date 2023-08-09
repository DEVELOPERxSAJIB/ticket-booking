import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import movieSlice from "../features/movie/movieSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    movies: movieSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
