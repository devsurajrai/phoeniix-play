import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchVideoData = createAsyncThunk(
  "video/fetchVideoData",
  async (videoID) => {
    const response = await axios.get(`/api/video/${videoID}`);
    return response.data.video;
  }
);
const initialState = {
  video: {},
  status: "idle",
  error: null,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVideoData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVideoData.fulfilled]: (state, action) => {
      state.status = "finished";
      state.video = action.payload;
    },
    [fetchVideoData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectVideoData = (state) => state.video.video;
export const selectVideoStatus = (state) => state.video.status;
export const selectVideoError = (state) => state.video.error;

export default videoSlice.reducer;
