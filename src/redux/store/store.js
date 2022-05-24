import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../slice/sideBarSlice";
import addToPlaylistModalReducer from "../slice/addToPlaylistModalSlice";
import videosReducer from "../slice/videosSlice";
import videoCategoriesReducer from "../slice/videoCategoriesSlice";
import videoSliceReducer from "../slice/videoSlice";
export default configureStore({
  reducer: {
    sidebar: sideBarReducer,
    addToPlaylistModal: addToPlaylistModalReducer,
    videos: videosReducer,
    videoCategories: videoCategoriesReducer,
    video: videoSliceReducer,
  },
});
