import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// watchlater  API Calls
// API Call for adding a video to the watch later array in the database of the user
// API-> METHOD: POST -> /api/user/watchlater
export const addVideoToWatchLater = createAsyncThunk(
  "watchlater/addVideoToWatchLater",
  async ({ video, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.post(
      `/api/user/watchlater`,
      { video },
      config
    );
    return response.data.watchlater;
  }
);

// API Call for for fetching watchlater array from the database of the user
// API-> METHOD: GET -> /api/user/watchlater
export const fetchWatchLaterVideos = createAsyncThunk(
  "watchlater/fetchWatchLaterVideos",
  async () => {
    const response = await axios.get(`/api/user/watchlater`);
    return response.data.watchlater;
  }
);

// API Call for for deleting a watchlater video array from the database of the user
// API-> METHOD: POST -> /api/user/watchlater/:videoId
export const removeWatchLaterVideo = createAsyncThunk(
  "watchlater/removeWatchLaterVideo",
  async ({ videoID, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.delete(
      `/api/user/watchlater/${videoID}`,
      config
    );
    return response.data.watchlater;
  }
);

const initialState = {
  watchlater: [],
  status: "idle",
  error: null,
};
const watchLaterSlice = createSlice({
  name: "watchlater",
  initialState,
  reducers: {
    setWatchlaterStatusToDefault: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    //add video to watchlater reducers
    [addVideoToWatchLater.pending]: (state) => {
      state.status = "loading";
    },
    [addVideoToWatchLater.fulfilled]: (state, action) => {
      state.status = "finished";
      state.watchlater = action.payload;
    },
    [addVideoToWatchLater.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // fetch watchlater videos reducers
    [fetchWatchLaterVideos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWatchLaterVideos.fulfilled]: (state, action) => {
      state.status = "finished";
      state.watchLater = action.payload;
    },
    [fetchWatchLaterVideos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //remove  video from watchlater
    [removeWatchLaterVideo.pending]: (state) => {
      state.status = "loading";
    },
    [removeWatchLaterVideo.fulfilled]: (state, action) => {
      state.status = "finished";
      state.watchlater = action.payload;
    },
    [removeWatchLaterVideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectWatchLater = (state) => state.watchlater.watchlater;
export const selectWatchLaterStatus = (state) => state.watchlater.status;
export const selectWatchLaterError = (state) => state.watchlater.error;
export const { setWatchlaterStatusToDefault } = watchLaterSlice.actions;

export default watchLaterSlice.reducer;
