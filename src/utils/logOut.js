export const logOut = (
  navigate,
  dispatch,
  setAuthToDefault,
  setToastData,
  toastData
) => {
  localStorage.clear("token");
  dispatch(setAuthToDefault());
  dispatch(
    setToastData({
      toastVisibility: !toastData.toastVisibility,
      toastText: "Logged Out Successfully",
      toastType: "finished",
    })
  );
  navigate("/");
};
