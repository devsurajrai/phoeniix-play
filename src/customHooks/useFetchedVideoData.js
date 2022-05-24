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

  console.log(videoID);
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
        <div className="text-3xl w-full flex  justify-end gap-4 ">
          <i className="fa-solid fa-thumbs-up pr-3 cursor-pointer hover:text-[#27AB83]" />
          <i className="fa-solid fa-clock pr-3 cursor-pointer hover:text-[#27AB83]" />
          <i
            className="fa-solid fa-plus cursor-pointer hover:text-[#27AB83]
          "
            onClick={() => dispatch(toggleAddToPlaylistModal())}
            role="button"
          />
        </div>
      </div>
    );
  }

  return { videoContent, videoData };
};

export { useFetchedVideoData };
