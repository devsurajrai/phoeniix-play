import { Input, Button } from "./components.js";
import { useDispatch } from "react-redux";
import { selectToastData, setToastData } from "../redux/slice/toastSlice.js";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const LoginMain = () => {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const { toastVisibility } = useSelector(selectToastData);
  const [passType, setPassType] = useState("password");
  const handleLoginValidation = (event) => {
    event.preventDefault();
    dispatch(
      setToastData({
        toastVisibility: !toastVisibility,
        toastText: "Please Enter The Correct Details",
        toastType: "error",
      })
    );
  };
  // The code below is for auto changing the password type to "password" from "text" after one second
  useEffect(() => {
    if (passType === "text")
      setTimeout(() => {
        setPassType("password");
      }, 1000);
  }, [passType]);
  // Helper functions
  const setPassTypeHandler = () => {
    setPassType((type) => (type !== "password" ? "password" : "text"));
  };
  const loginEmailHandler = (e) => {
    setLoginEmail(e.target.value);
  };
  const loginPassHandler = (e) => {
    setLoginPass(e.target.value);
  };
  console.log(loginEmail, loginPass);
  return (
    <div className="h-[calc(100vh-4rem)] w-screen  flex flex-col justify-center  items-center">
      <h2 className="text-4xl p-3 font-bold tracking-wider">Login</h2>
      <form
        className="px-20 pt-14 pb-10 flex flex-col justify-between items-center gap-5 bg-white  w-[40vw] h-3/5 shadow-2xl"
        action="submit"
        onSubmit={(e) => handleLoginValidation(e)}
      >
        <Input
          placeholder="Enter Email"
          type="email"
          required
          callback={loginEmailHandler}
        />
        <Input
          placeholder="Enter Password"
          type={passType}
          setPassTypeHandler={setPassTypeHandler}
          callback={loginPassHandler}
          required
          password
        />
        <div className="flex flex-col items-center w-full gap-5">
          <Button btnType="primary" buttonText="Login" type="submit" />
          <Button btnType="secondary" buttonText="Login As Guest " />
        </div>
      </form>
    </div>
  );
};

export { LoginMain };
