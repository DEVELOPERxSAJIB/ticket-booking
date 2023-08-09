import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all moives
export const getAllmovies = createAsyncThunk("movie/getAllmovies", async () => {
  try {
    const response = await axios.get(
      `http://localhost:3030/api/v1/movie/all-movies`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// create a movie
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (data) => {

    try {
      const response = await axios.post(
        `http://localhost:3030/api/v1/movie/create-movie`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delete movie
export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3030/api/v1/movie/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});
