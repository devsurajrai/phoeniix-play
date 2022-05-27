import { Input, Button } from "./components.js";
import { useDispatch } from "react-redux";
import { selectToastData, setToastData } from "../redux/slice/toastSlice.js";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectAuthInfo, loginUser } from "../redux/slice/authSlice.js";
import { login } from "../utils/utils.js";
import { useLocation, useNavigate } from "react-router-dom";

const LoginMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginEmail, setLoginEmail] = useState("devsurajrai@gmail.com");
  const [loginPass, setLoginPass] = useState("rai123");
  const authState = useSelector(selectAuthInfo);
  const [passType, setPassType] = useState("password");
  const handleLoginValidation = (event) => {
    event.preventDefault();
  };
  // The code below is for auto changing the password type to "password" from "text" after one second
  useEffect(() => {
    if (passType === "text")
      setTimeout(() => {
        setPassType("password");
      }, 1000);
  }, [passType]);
  useEffect(() => {
    if (authState.status === "loading") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: "Logging In",
          toastType: "in progress",
        })
      );
    }
    if (authState.status === "finished") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: "Logged in Successfully ",
          toastType: "Success",
        })
      );
      navigate(location?.state?.from || "/", { replace: true });
    }
    if (authState.status === "failed") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: authState.error,
          toastType: "error",
        })
      );
    }
  }, [authState.status]);

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

  return (
    <div className="h-[calc(100vh-4rem)] w-screen  flex flex-col justify-center  items-center">
      <h2 className="text-4xl p-3 font-bold tracking-wider">Login</h2>
      <form
        className="px-20 pt-14 pb-10 flex flex-col justify-between items-center gap-5 bg-white  w-[40vw] h-3/5 shadow-2xl"
        action="submit"
        onSubmit={(event) =>
          login(dispatch, loginUser, event, loginEmail, loginPass)
        }
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
          <Button
            btnType="secondary"
            buttonText="Login As Guest "
            callback={(event) =>
              login(
                dispatch,
                loginUser,
                event,
                "devsurajrai@gmail.com",
                "rai123"
              )
            }
          />
        </div>
      </form>
    </div>
  );
};

export { LoginMain };
