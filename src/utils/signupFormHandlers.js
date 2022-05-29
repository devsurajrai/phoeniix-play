export const signupFormHandlers = (dispatchSignupForm) => {
  const handleFormFirstName = (e) => {
    dispatchSignupForm({ type: "SET_FIRST_NAME", payload: e.target.value });
  };
  const handleFormLastName = (e) => {
    dispatchSignupForm({ type: "SET_LAST_NAME", payload: e.target.value });
  };
  const handleFormEmail = (e) => {
    dispatchSignupForm({ type: "SET_EMAIL", payload: e.target.value });
  };
  const handleFormPassword = (e) => {
    dispatchSignupForm({ type: "SET_PASSWORD", payload: e.target.value });
  };
  const handleFormConfirmPassword = (e) => {
    dispatchSignupForm({
      type: "SET_CONFIRM_PASSWORD",
      payload: e.target.value,
    });
  };
  const handleCreateAccountBtn = (e, dispatch, createUser, signupFormData) => {
    const { firstName, lastName, email, password } = signupFormData;
    e.preventDefault();
    dispatch(createUser({ firstName, lastName, email, password }));
  };
  return {
    handleFormFirstName,
    handleFormLastName,
    handleFormEmail,
    handleFormPassword,
    handleFormConfirmPassword,
    handleCreateAccountBtn,
  };
};
