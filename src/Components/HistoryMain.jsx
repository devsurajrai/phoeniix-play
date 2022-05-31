import React from "react";
import { useFetchedHistoryData } from "../customHooks/useFetchedHistoryData";
import { useDispatch } from "react-redux";
import { removeHistoryVideosAll } from "../redux/slice/historySlice";
import { selectAuthInfo } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
const HistoryMain = () => {
  const { jsx, historyData } = useFetchedHistoryData({});
  const dispatch = useDispatch();
  const { encodedToken } = useSelector(selectAuthInfo);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll">
      <div className="bg-[#334E68] mt-1 mb-3 fixed w-full text-[#F0F4F8] flex justify-between items-center">
        <section>
          <div className="m-1 px-3 mx-3 rounded-md border-2 border-[#27AB83] cursor-pointer  hover:bg-[#C6F7E2] hover:text-[#334E68] ">
            <button
              onClick={() => dispatch(removeHistoryVideosAll({ encodedToken }))}
            >
              Clear All
            </button>
          </div>
        </section>
        <p className="font-bold  p-3 text-md mx-3">
          Total Videos:{historyData.length}
        </p>
      </div>
      <div className="flex gap-14 flex-wrap justify-center mt-[5rem] mb-[2rem]">
        {jsx}
      </div>
    </div>
  );
};

export { HistoryMain };
