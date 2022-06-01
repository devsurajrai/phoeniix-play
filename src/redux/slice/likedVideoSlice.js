import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Liked Video API Calls
// API Call for adding a video to the liked video array in the database of the user
// API-> METHOD: POST -> /api/user/likes
export const addLikedVideo = createAsyncThunk(
  "likes/addLikedVideos",
  async ({ video, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.post(`/api/user/likes`, { video }, config);
    return response.data.likes;
  }
);

// API Call for for fetching liked video array from the database of the user
// API-> METHOD: GET -> /api/user/likes
export const fetchLikedVideos = createAsyncThunk(
  "likes/fetchLikedVideos",
  async () => {
    const response = await axios.get(`/api/user/likes`);
    return response.data.likes;
  }
);

// API Call for for deleting a liked video array from the database of the user
// API-> METHOD: POST -> /api/user/likes/:videoId
export const removeLikedVideo = createAsyncThunk(
  "likedVideo/fetchLikedVideos",
  async ({ videoID, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.delete(`/api/user/likes/${videoID}`, config);
    return response.data.likes;
  }
);

const initialState = {
  likedVideos: [],
  status: "idle",
  error: null,
};
const likedVideoSlice = createSlice({
  name: "likedVideo",
  initialState,
  reducers: {
    setLikedVideoStatusToDefault: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    // add video to likedVideo array reducer
    [addLikedVideo.pending]: (state) => {
      state.status = "loading";
    },
    [addLikedVideo.fulfilled]: (state, action) => {
      state.status = "finished";
      state.likedVideos = action.payload;
    },
    [addLikedVideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // fetch user's liked videos
    [fetchLikedVideos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLikedVideos.fulfilled]: (state, action) => {
      state.status = "finished";
      state.likedVideos = [...state.likedVideos, ...action.payload];
    },
    [fetchLikedVideos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // remove video from user's liked videos
    [removeLikedVideo.pending]: (state) => {
      state.status = "loading";
    },
    [removeLikedVideo.fulfilled]: (state, action) => {
      state.status = "finished";
      state.likedVideos = action.payload;
    },
    [removeLikedVideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectLikedVideos = (state) => state.likedVideo.likedVideos;
export const selectLikedVideoStatus = (state) => state.likedVideo.status;
export const selectLikedVideoError = (state) => state.likedVideo.error;
export const { setLikedVideoStatusToDefault } = likedVideoSlice.actions;
export default likedVideoSlice.reducer;
