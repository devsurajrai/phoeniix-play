import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastVisibility: false,
  toastText: "",
  toastType: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastData: (state, action) => {
      return {
        toastVisibility: action.payload.toastVisibility,
        toastText: action.payload.toastText,
        toastType: action.payload.toastType,
      };
    },
  },
});

export const selectToastData = (store) => store.toast;
export const { setToastData } = toastSlice.actions;
export default toastSlice.reducer;
