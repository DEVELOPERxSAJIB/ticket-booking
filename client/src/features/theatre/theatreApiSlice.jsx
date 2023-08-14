import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all theatre
export const getAllTheatre = createAsyncThunk(
  "theatre/getAllTheatre",
  async () => {
    try {
      const response = await axios.get(`http://localhost:3030/api/v1/theatre`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create a theatre
export const createTheatre = createAsyncThunk(
  "theatre/createMovie",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/v1/theatre/create-theatre`,
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

// delete theatre
export const deleteTheatre = createAsyncThunk(
  "theatre/deleteTheatre",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/api/v1/theatre/delete-theatre/${id}`,
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

// theatre stauts change
export const updateTheatreStatus = createAsyncThunk(
  "theatre/updateTheatreStatus",
  async ({ isActive, id }) => {
    try {
      const response = await axios.put(
        `http://localhost:3030/api/v1/theatre/change-theatre-status/${id}`,
        { isActive },
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