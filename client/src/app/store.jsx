import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import movieSlice from "../features/movie/movieSlice";
import theatreSlice from "../features/theatre/theatreSlice";
import showSlice from "../features/show/showSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    movies: movieSlice,
    theatres : theatreSlice,
    shows : showSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
