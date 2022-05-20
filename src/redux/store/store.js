import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../slice/sideBarSlice";
import addToPlaylistModalReducer from "../slice/addToPlaylistModalSlice";
export default configureStore({
  reducer: {
    sidebar: sideBarReducer,
    addToPlaylistModal: addToPlaylistModalReducer,
  },
});
