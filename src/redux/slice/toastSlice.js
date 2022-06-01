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
    setToastText: (state, action) => {
      state.toastText = action.payload;
    },
  },
});

export const selectToastData = (store) => store.toast;
export const selectToastText = (store) => store.toast.toastText;
export const { setToastData, setToastText } = toastSlice.actions;
export default toastSlice.reducer;
