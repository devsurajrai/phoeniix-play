import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isCreatePlaylistModalVisible: false,
};
export const createPlaylistModalSlice = createSlice({
  name: "createPlaylistModal",
  initialState,
  reducers: {
    toggleCreatePlaylistModal: (state) => {
      state.isCreatePlaylistModalVisible = !state.isCreatePlaylistModalVisible;
    },
  },
});

//Action creators are generated for each case reducer function

export const { toggleCreatePlaylistModal } = createPlaylistModalSlice.actions;
export const isCreatePlaylistModalVisible = (state) =>
  state.createPlaylistModal.isCreatePlaylistModalVisible;

export default createPlaylistModalSlice.reducer;
