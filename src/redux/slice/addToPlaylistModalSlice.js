import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAddToPlaylistModalVisible: false,
};
export const addToPlaylistModalSlice = createSlice({
  name: "addToPlaylistModal",
  initialState,
  reducers: {
    toggleAddToPlaylistModal: (state) => {
      state.isAddToPlaylistModalVisible = !state.isAddToPlaylistModalVisible;
    },
  },
});

//Action creators are generated for each case reducer function

export const { toggleAddToPlaylistModal } = addToPlaylistModalSlice.actions;
export const isAddToPlaylistModalVisible = (state) =>
  state.addToPlaylistModal.isAddToPlaylistModalVisible;

export default addToPlaylistModalSlice.reducer;
