export const login = (dispatch, loginUser, event, email, password) => {
  event.preventDefault();
  console.log("Login Func Getting Executed");
  dispatch(loginUser({ email, password }));
};
