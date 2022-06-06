import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// History  API Calls
// API Call for adding a video to the history array in the database of the user
// API-> METHOD: POST -> /api/user/history
export const addVideoToHistory = createAsyncThunk(
  "history/addVideoToHistory",
  async ({ video, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.post(`/api/user/history`, { video }, config);
    return response.data.history;
  }
);

// API Call for for fetching history array from the database of the user
// API-> METHOD: GET -> /api/user/history
export const fetchHistoryVideos = createAsyncThunk(
  "history/fetchHistory",
  async () => {
    const response = await axios.get(`/api/user/history`);
    return response.data.history;
  }
);

// API Call for for deleting a liked video array from the database of the user
// API-> METHOD: POST -> /api/user/history/:videoId
export const removeHistoryVideo = createAsyncThunk(
  "history/removeHistoryVideo",
  async ({ video, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.delete(
      `/api/user/history/${video._id}`,
      config
    );
    return response.data.history;
  }
);
// API Call for for deleting a liked video array from the database of the user
// API-> METHOD: POST -> /api/user/history/all
export const removeHistoryVideosAll = createAsyncThunk(
  "history/removeHistoryVideo",
  async ({ encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.delete(`/api/user/history/all`, config);
    return response.data.history;
  }
);

const initialState = {
  history: [],
  status: "idle",
  error: null,
};
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistoryStatusToDefault: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    //add video to history reducers
    [addVideoToHistory.pending]: (state) => {
      state.status = "loading";
    },
    [addVideoToHistory.fulfilled]: (state, action) => {
      state.status = "finished";
      state.history = action.payload;
    },
    [addVideoToHistory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // fetch history videos reducers
    [fetchHistoryVideos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchHistoryVideos.fulfilled]: (state, action) => {
      state.status = "finished";
      state.history = action.payload;
    },
    [fetchHistoryVideos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //remove  video from history
    [removeHistoryVideo.pending]: (state) => {
      state.status = "loading";
    },
    [removeHistoryVideo.fulfilled]: (state, action) => {
      state.status = "finished";
      state.history = action.payload;
    },
    [removeHistoryVideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //remove  all videos from history
    [removeHistoryVideosAll.pending]: (state) => {
      state.status = "loading";
    },
    [removeHistoryVideosAll.fulfilled]: (state, action) => {
      state.status = "finished";
      state.history = action.payload;
    },
    [removeHistoryVideosAll.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectHistory = (store) => store.history.history;
export const selectHistoryStatus = (store) => store.history.status;
export const selectHistoryError = (store) => store.history.error;
export const { setHistoryStatusToDefault } = historySlice.actions;

export default historySlice.reducer;
