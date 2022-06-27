import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  videos: [],
  status: "idle",
  error: null,
};

const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axios.get("/api/videos");
  return response.data.videos;
});

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},

  extraReducers: {
    [fetchVideos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVideos.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.videos = action.payload;
    },
    [fetchVideos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

const selectVideos = (state) => state.videos.videos;
const selectVideosStatus = (state) => state.videos.status;
const selectVideosError = (state) => state.videos.error;

export { fetchVideos, selectVideos, selectVideosStatus, selectVideosError };
export default videosSlice.reducer;
