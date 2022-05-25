import React from "react";
import { useParams } from "react-router-dom";
import { useFetchedVideoData } from "../customHooks/useFetchedVideoData";
import { useFetchedVideosData } from "../customHooks/useFetchedVideosData";
import { AddToPlaylistModal } from "./AddToPlaylistModal.jsx";

const VideoSinglePage = () => {
  const { videoID } = useParams();
  const { videoContent } = useFetchedVideoData(videoID);
  const { jsx } = useFetchedVideosData({
    videoCardWidth: "w-full",
    videoID,
  });
  return (
    <div className=" h-[calc(100vh-4rem)] flex">
      <section className="w-3/4 bg-white h-full flex flex-col items-center pt-9 ">
        {videoContent}
      </section>
      <section className="w-1/4 overflow-scroll p-7 flex flex-col gap-8">
        <h3 className="font-bold ">Recommended</h3>
        {jsx}
      </section>
      <AddToPlaylistModal />
    </div>
  );
};

export { VideoSinglePage };
