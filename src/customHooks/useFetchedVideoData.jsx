import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideos,
  selectVideos,
  selectVideosError,
  selectVideosStatus,
} from "../redux/slice/videosSlice";
import { useEffect } from "react";
import { VideoCard } from "../Components/VideoCard.jsx";
import ClipLoader from "react-spinners/ClipLoader";

const useFetchedVideoData = () => {
  const videoDataStatus = useSelector(selectVideosStatus);
  const videoDataError = useSelector(selectVideosError);
  const videoData = useSelector(selectVideos);
  const dispatch = useDispatch();
  let jsx = "";
  useEffect(() => {
    if (videoDataStatus === "idle") {
      dispatch(fetchVideos());
    }
  }, [videoDataStatus, dispatch]);

  if (videoDataStatus === "loading") {
    jsx = <ClipLoader />;
  } else if (videoDataStatus === "failed") {
    jsx = <h3>{videoDataError}</h3>;
  } else {
    jsx = videoData.map((video) => <VideoCard key={video._id} video={video} />);
  }
  return { jsx, videoData };
};

export { useFetchedVideoData };
