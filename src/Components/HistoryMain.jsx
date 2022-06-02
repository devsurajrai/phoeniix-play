import React from "react";
import { useFetchedHistoryData } from "../customHooks/useFetchedHistoryData";
import { useDispatch } from "react-redux";
import { removeHistoryVideosAll } from "../redux/slice/historySlice";
import { selectAuthInfo } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
import { selectHistory } from "../redux/slice/historySlice";
import { VideoCard } from "./VideoCard";
const HistoryMain = () => {
  const historyData = useSelector(selectHistory);
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
        {historyData.length !== 0 ? (
          historyData.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              width="w-1/5"
              isInHistory={true}
            />
          ))
        ) : (
          <div className="bg-yellow-300 h-[4rem] p-5 w-[30rem] flex justify-center">
            <p className="text-xl font-semibold text-yellow-700">
              Sorry ! its nothing here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { HistoryMain };
