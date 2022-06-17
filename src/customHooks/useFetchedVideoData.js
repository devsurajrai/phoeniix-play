/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// the above es-lint rules have been disabled for this file, these are basically to enforce accessibility
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVideoData,
  selectVideoError,
  selectVideoStatus,
} from "../redux/slice/videoSlice";
import { fetchVideoData } from "../redux/slice/videoSlice";
import ClipLoader from "react-spinners/ClipLoader";
import ReactPlayer from "react-player";
import { toggleAddToPlaylistModal } from "../redux/slice/addToPlaylistModalSlice";

// import { Player } from "video-react";
const useFetchedVideoData = (videoID) => {
  const dispatch = useDispatch();
  const videoData = useSelector(selectVideoData);
  const videoDataStatus = useSelector(selectVideoStatus);
  const videoDataError = useSelector(selectVideoError);
  useEffect(() => {
    dispatch(fetchVideoData(videoID));
  }, [dispatch, videoID]);
  let videoContent = "";
  if (videoDataStatus === "loading") {
    videoContent = <ClipLoader />;
  } else if (videoDataStatus === "failed") {
    videoContent = <p>{videoDataError}</p>;
  } else {
    videoContent = (
      <div>
        <ReactPlayer url={videoData.url} width="70vw" height="70vh" />
        <h3 className="font-bold text-xl py-3 w-[90%]">{videoData.title}</h3>
      </div>
    );
  }

  return { videoContent, videoData };
};

export { useFetchedVideoData };
