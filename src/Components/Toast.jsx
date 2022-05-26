import { selectToastData, setToastData } from "../redux/slice/toastSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Toast = () => {
  const { toastVisibility, toastText, toastType } =
    useSelector(selectToastData);
  const dispatch = useDispatch();
  useEffect(() => {
    toastVisibility &&
      setTimeout(() => {
        dispatch(
          setToastData({
            toastVisibility: !toastVisibility,
            toastText: "",
            toastType: "",
          })
        );
      }, 1000);
  });

  return (
    <>
      {
        <div
          className={` absolute  w-[20rem] px-2 py-4 m-2 tracking-wide  ${
            toastType === "error" ? "bg-red-300" : "bg-green-300"
          }  flex justify-center items-center gap-2 ${
            !toastVisibility ? "-right-[22rem]" : "right-0"
          } transition-all duration-200`}
        >
          {toastType === "error" ? (
            <i className={` fa-solid fa-circle-xmark text-red-700  text-xl`} />
          ) : (
            <i className="fa-solid fa-circle-check text-xl text-green-700" />
          )}
          <p
            className={` ${
              toastType === "error" ? "text-red-700" : "text-green-700"
            } font-semibold`}
          >
            {toastText}
          </p>
        </div>
      }
    </>
  );
};
// const Toast = () => {
//         // const toastVisibility= true
//         const toastText= "Please Check Your Credentials"
//         const toastMode= "Error",
//   return (
//       {toastVisibility &&
//         (<div className="absolute w-[20rem] p-2 border-4 ">
//         <i className="fa-solid fa-circle-xmark text-red-700 text-xl" />
//       </div>)
//     }

//   );
// };

export { Toast };
