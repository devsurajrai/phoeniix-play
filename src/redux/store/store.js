import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../slice/sideBarSlice";
import addToPlaylistModalReducer from "../slice/addToPlaylistModalSlice";
import videosReducer from "../slice/videosSlice";
import videoCategoriesReducer from "../slice/videoCategoriesSlice";
export default configureStore({
  reducer: {
    sidebar: sideBarReducer,
    addToPlaylistModal: addToPlaylistModalReducer,
    videos: videosReducer,
    videoCategories: videoCategoriesReducer,
  },
});
