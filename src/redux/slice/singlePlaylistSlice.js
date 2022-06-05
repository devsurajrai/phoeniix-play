import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API Call for getting a playlist from the database of the user
// API-> METHOD: GET -> /api/user/playlists/:playlistId
export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async ({ playlistID, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.get(
      `/api/user/playlists/${playlistID}`,
      config
    );
    return response.data.playlist;
  }
);
// API Call for removing a playlist from the database of the user
// API-> METHOD: post -> /api/user/playlists/:playlistId/:videoId
export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideoFromPlaylist",
  async ({ videoID, playlistID, encodedToken }) => {
    console.log(playlistID, videoID, encodedToken);
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.delete(
      `/api/user/playlists/${playlistID}/${videoID}`,
      config
    );
    return response.data.playlist;
  }
);

const initialState = {
  playlist: {},
  status: "idle",
  error: null,
};
const singlePlaylistSlice = createSlice({
  name: "playlist",
  initialState,

  extraReducers: {
    [getPlaylist.fulfilled]: (state, action) => {
      state.status = "finished";
      state.playlist = action.payload;
    },
    [getPlaylist.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [removeVideoFromPlaylist.fulfilled]: (state, action) => {
      state.playlist = action.payload;
    },
  },
});
export const selectSinglePlaylist = (store) => store.playlist.playlist;
export const selectSinglePlaylistError = (store) => store.playlist.error;
export default singlePlaylistSlice.reducer;
