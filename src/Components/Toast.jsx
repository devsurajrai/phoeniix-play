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
        console.log("setting the tostData to default");
        dispatch(
          setToastData({
            toastVisibility: false,
            toastText: "",
            toastType: "",
          })
        );
      }, 1500);
  });

  return (
    <>
      {
        <div
          className={` absolute  w-[20rem] px-2 py-4 m-2 tracking-wide  ${
            toastType === "error"
              ? "bg-red-300"
              : toastType === "in progress"
              ? "bg-yellow-300"
              : "bg-green-300"
          }  flex justify-center items-center gap-3 ${
            !toastVisibility ? "-right-[22rem]" : "right-0"
          } transition-all duration-200 z-20`}
        >
          {toastType === "error" ? (
            <i className={` fa-solid fa-circle-xmark text-red-700  text-xl`} />
          ) : toastType === "in progress" ? (
            <i className="fa-solid fa-spinner text-yellow-700 text-xl"></i>
          ) : (
            <i className="fa-solid fa-circle-check text-xl text-green-700" />
          )}
          <p
            className={`
            ${
              toastType === "error"
                ? "bg-red-300"
                : toastType === "in progress"
                ? "bg-yellow-300"
                : "bg-green-300"
            }
            font-semibold`}
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
