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
import { filterByCategory } from "../utils/utils";

export const useFetchedVideosData = (
  { videoCardWidth = "w-1/5", videoID = "" },
  filterBy
) => {
  const videoDataStatus = useSelector(selectVideosStatus);
  const videoDataError = useSelector(selectVideosError);
  const videosData = useSelector(selectVideos);
  const dispatch = useDispatch();
  const filteredByCategoryVideos = filterByCategory(filterBy, videosData);
  let jsx = "";
  // fetch videos from backend only when the status is idle
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
    jsx = filteredByCategoryVideos.map(
      (video) =>
        video._id !== videoID && (
          <VideoCard key={video._id} video={video} width={videoCardWidth} />
        )
    );
  }
  return { jsx, filteredByCategoryVideos };
};
