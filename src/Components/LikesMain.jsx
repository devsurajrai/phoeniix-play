import React from "react";
import { selectLikedVideos } from "../redux/slice/likedVideoSlice";

import { useSelector } from "react-redux";
import { VideoCard } from "./VideoCard.jsx";
const LikesMain = () => {
  const likedVideoData = useSelector(selectLikedVideos);
  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll">
      <div className="bg-[#334E68] mt-1 mb-3 fixed w-full text-[#F0F4F8] flex justify-end items-center">
        <p className="font-bold  p-3 text-md mx-3">
          Total Videos:{likedVideoData.length}
        </p>
      </div>
      <div
        className={`flex gap-14 flex-wrap ${
          likedVideoData.length !== 0 ? "justify-start" : "justify-center"
        } p-12 mt-[3rem] mb-[2rem] `}
      >
        {likedVideoData.length !== 0 ? (
          likedVideoData.map((video) => (
            <VideoCard key={video._id} video={video} width="w-1/5" />
          ))
        ) : (
          <div className="bg-yellow-300 h-[4rem] p-5 w-[30rem] flex justify-center">
            <p className="text-xl font-semibold text-yellow-700">
              You don't have any liked videos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { LikesMain };
