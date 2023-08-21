import { createSlice } from "@reduxjs/toolkit";
import {
  createTheatre,
  deleteTheatre,
  getAllTheatre,
  singleTheatre,
  updateTheatreStatus,
} from "./theatreApiSlice";

const theatreSlice = createSlice({
  name: "theatre",
  initialState: {
    theatre: [],
    message: "",
    error: "",
    loader: "",
    single : '',
  },

  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTheatre.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllTheatre.fulfilled, (state, action) => {
        (state.loader = false), (state.message = action.payload.message);
        state.theatre = action.payload.payload.theatre;
      })
      .addCase(getAllTheatre.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createTheatre.pending, (state) => {
        state.loader = true;
      })
      .addCase(createTheatre.fulfilled, (state, action) => {
        (state.loader = false), (state.message = action.payload.message);
        state.theatre.push(action.payload.payload.theatre);
      })
      .addCase(createTheatre.rejected, (state, action) => {
        (state.loader = false), (state.error = action.error.message);
      })
      .addCase(updateTheatreStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTheatreStatus.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.theatre[
          state.theatre.findIndex(
            (data) => data._id === action.payload.payload.theatre._id
          )
        ] = action.payload.payload.theatre;
      })
      .addCase(singleTheatre.fulfilled, (state, action) => {
        state.single = state.theatre.filter(
          (data) => data._id === action.payload.payload.theatre._id
        );
      })
      .addCase(deleteTheatre.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTheatre.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.theatre = state.theatre.filter(
          (data) => data._id !== action.payload.payload.theatre._id
        );
      });
  },
});

// selector
export const theatreStateData = (state) => state.theatres;

// actions
export const { setMessageEmpty } = theatreSlice.actions;

// default export
export default theatreSlice.reducer;
