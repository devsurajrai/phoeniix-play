import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSideBarVisible: false,
};
export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarVisible = !state.isSideBarVisible;
    },
  },
});

//Action creators are generated for each case reducer function

export const { toggleSidebar } = sideBarSlice.actions;
export const isSideBarVisible = (state) => state.sidebar.isSideBarVisible;

export default sideBarSlice.reducer;
