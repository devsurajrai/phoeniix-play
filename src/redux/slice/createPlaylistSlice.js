import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API Call for adding a video to the history array in the database of the user
// API-> METHOD: POST -> /api/user/playlists
export const createPlaylist = createAsyncThunk(
  "playlists/createPlaylist",
  async ({ playlistTitle, playlistDescription, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.post(
      `/api/user/playlists`,
      {
        playlist: { title: playlistTitle, description: playlistDescription },
      },
      config
    );
    return response.data.playlists;
  }
);
// API Call for adding a video to the history array in the database of the user
// API-> METHOD: POST -> /api/user/playlists
export const getPlaylists = createAsyncThunk(
  "playlists/getPlaylists",
  async ({ encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.get(`/api/user/playlists`, config);
    return response.data.playlists;
  }
);
// API Call for adding a video to a playlist in the database of the user
// API-> METHOD: POST -> /api/user/playlists/:playlistId
export const addVideoToPlaylist = createAsyncThunk(
  "playlists/addVideoToPlaylist",
  async ({ video, playlistID, encodedToken }) => {
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.post(
      `/api/user/playlists/${playlistID}`,
      {
        video,
      },
      config
    );
    return response.data.playlist;
  }
);
// API Call for a playlist from  the database of the user
// API-> METHOD: DELETE -> /api/user/playlists/:playlistId
export const removePlaylist = createAsyncThunk(
  "playlists/removePlaylist",
  async ({ playlistID, encodedToken }) => {
    console.log("playlist is being removed");
    console.log("playlistID", playlistID, "token", encodedToken);
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const response = await axios.delete(
      `/api/user/playlists/${playlistID}`,
      config
    );
    console.log(response.data);
    return response.data.playlists;
  }
);

const initialState = {
  playlists: [],
  status: "idle",
  error: null,
};
const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylistsStatusToDefault: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    //add video to history reducers
    [createPlaylist.pending]: (state) => {
      state.status = "loading";
    },
    [createPlaylist.fulfilled]: (state, action) => {
      state.status = "finished";
      state.playlists = action.payload;
    },
    [createPlaylist.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getPlaylists.fulfilled]: (state, action) => {
      state.playlists = action.payload;
    },
    [removePlaylist.fulfilled]: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const selectPlaylists = (store) => store.playlists.playlists;
export const selectPlaylistsStatus = (store) => store.playlists.status;
export const selectPlaylistsError = (store) => store.playlists.error;
export const { setPlaylistsStatusToDefault } = playlistsSlice.actions;

export default playlistsSlice.reducer;
