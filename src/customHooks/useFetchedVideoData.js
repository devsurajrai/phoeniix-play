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
import { LikeWatchlaterPlaylist } from "../Components/LikeWatchlaterPlaylist";

// import { Player } from "video-react";
const useFetchedVideoData = (videoID) => {
  const dispatch = useDispatch();
  const videoData = useSelector(selectVideoData);
  const videoDataStatus = useSelector(selectVideoStatus);
  const videoDataError = useSelector(selectVideoError);
  console.log(videoData);
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

        <div className="flex justify-between items-center text-2xl pr-10">
          <ul className="text-sm w-[35%] flex justify-between font-thin">
            <li>Likes:{videoData.likes}</li>
            <li>Added:{videoData.added}</li>
            <li>{videoData.views}</li>
          </ul>
          <LikeWatchlaterPlaylist video={videoData} />
        </div>
      </div>
    );
  }

  return { videoContent, videoData };
};

export { useFetchedVideoData };
