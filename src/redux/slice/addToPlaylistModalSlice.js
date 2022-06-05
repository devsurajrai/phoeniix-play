import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAddToPlaylistModalVisible: false,
  video: "",
};
export const addToPlaylistModalSlice = createSlice({
  name: "addToPlaylistModal",
  initialState,
  reducers: {
    toggleAddToPlaylistModal: (state) => {
      state.isAddToPlaylistModalVisible = !state.isAddToPlaylistModalVisible;
    },
    setVideoToAddToPlaylist: (state, action) => {
      state.video = action.payload;
    },
  },
});

//Action creators are generated for each case reducer function

export const { toggleAddToPlaylistModal, setVideoToAddToPlaylist } =
  addToPlaylistModalSlice.actions;
export const isAddToPlaylistModalVisible = (state) =>
  state.addToPlaylistModal.isAddToPlaylistModalVisible;
export const videoToBeAddedToPlaylist = (state) =>
  state.addToPlaylistModal.video;

export default addToPlaylistModalSlice.reducer;
