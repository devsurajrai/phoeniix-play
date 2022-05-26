import { Input, Button } from "./components.js";
import { useDispatch } from "react-redux";
import { selectToastData, setToastData } from "../redux/slice/toastSlice.js";
import { useSelector } from "react-redux";
const LoginMain = () => {
  const dispatch = useDispatch();
  const { toastVisibility } = useSelector(selectToastData);
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
  return (
    <div className="h-[calc(100vh-4rem)] w-screen  flex flex-col justify-center  items-center">
      <h2 className="text-4xl p-3 font-bold tracking-wider">Login</h2>
      <form className="px-20 pt-14 pb-10 flex flex-col justify-between items-center gap-5 bg-white  w-[40vw] h-3/5 shadow-2xl">
        <Input placeholder="Enter Email" />
        <Input placeholder="Enter Password" password />
        <div className="flex flex-col items-center w-full gap-5">
          <Button
            type="primary"
            buttonText="Login"
            callback={handleLoginValidation}
          />
          <Button type="secondary" buttonText="Login As Guest " />
        </div>
      </form>
    </div>
  );
};

export { LoginMain };
