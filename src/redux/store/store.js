import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../slice/sideBarSlice";
import addToPlaylistModalReducer from "../slice/addToPlaylistModalSlice";
import videosReducer from "../slice/videosSlice";
import videoCategoriesReducer from "../slice/videoCategoriesSlice";
import videoSliceReducer from "../slice/videoSlice";
import toastReducer from "../slice/toastSlice";
import authSliceReducer from "../slice/authSlice";
import likedVideoSliceReducer from "../slice/likedVideoSlice";
import historySliceReducer from "../slice/historySlice";
import watchLaterSliceReducer from "../slice/watchLaterSlice";
import createPlaylistModalSliceReducer from "../slice/createPlaylistModalSlice";
import createPlaylistSliceReducer from "../slice/createPlaylistSlice";
import singlePlaylistSliceReducer from "../slice/singlePlaylistSlice";
export default configureStore({
  reducer: {
    sidebar: sideBarReducer,
    addToPlaylistModal: addToPlaylistModalReducer,
    videos: videosReducer,
    videoCategories: videoCategoriesReducer,
    video: videoSliceReducer,
    toast: toastReducer,
    auth: authSliceReducer,
    likedVideo: likedVideoSliceReducer,
    history: historySliceReducer,
    watchlater: watchLaterSliceReducer,
    createPlaylistModal: createPlaylistModalSliceReducer,
    playlists: createPlaylistSliceReducer,
    playlist: singlePlaylistSliceReducer,
  },
});
