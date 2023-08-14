import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import movieSlice from "../features/movie/movieSlice";
import theatreSlice from "../features/theatre/theatreSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    movies: movieSlice,
    theatres : theatreSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
