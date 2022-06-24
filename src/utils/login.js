export const login = (
  dispatch,
  loginUser,
  event,
  email,
  password,
  setToastData
) => {
  event.preventDefault();
  console.log(email, password);
  if (email === "" || password === "") {
    dispatch(
      setToastData({
        toastVisibility: true,
        toastText: " Please check login ID or Password",
        toastType: "error",
      })
    );
  } else {
    dispatch(loginUser({ email, password }));
  }
};
