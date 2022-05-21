import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const fetchVideoCategories = createAsyncThunk(
  "videoCategories/fetchVideoCategories",
  async () => {
    const response = await axios.get("/api/categories");
    return response.data.categories;
  }
);
const initialState = {
  videoCategories: [],
};

const videoCategoriesSlice = createSlice({
  name: "videoCategories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVideoCategories.fulfilled]: (state, action) => {
      state.videoCategories = action.payload;
    },
  },
});

export { fetchVideoCategories };

export const selectVideoCategories = (state) =>
  state.videoCategories.videoCategories;

export default videoCategoriesSlice.reducer;
