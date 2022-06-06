export const login = (dispatch, loginUser, event, email, password) => {
  event.preventDefault();
  dispatch(loginUser({ email, password }));
};
