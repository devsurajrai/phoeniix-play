import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../slice/sideBarSlice";

export default configureStore({
  reducer: {
    sidebar: sideBarReducer,
  },
});
