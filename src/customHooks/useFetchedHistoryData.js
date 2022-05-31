import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistoryVideos,
  selectHistory,
  selectHistoryStatus,
  selectHistoryError,
} from "../redux/slice/historySlice";
import { useEffect } from "react";
import { VideoCard } from "../Components/VideoCard.jsx";
import ClipLoader from "react-spinners/ClipLoader";

export const useFetchedHistoryData = ({
  videoCardWidth = "w-1/5",
  videoID = 0,
}) => {
  const historyDataStatus = useSelector(selectHistoryStatus);
  const historyDataError = useSelector(selectHistoryError);
  const historyData = useSelector(selectHistory);
  const dispatch = useDispatch();
  let jsx = "";
  // fetch videos from backend only when the status is idle
  useEffect(() => {
    if (historyDataStatus === "idle") {
      console.log("calling api");
      dispatch(fetchHistoryVideos());
    }
  }, [historyDataStatus, dispatch]);

  if (historyDataStatus === "loading") {
    jsx = <ClipLoader />;
  } else if (historyDataStatus === "failed") {
    jsx = <h3>{historyDataError}</h3>;
  } else {
    console.log(historyData);
    historyData.length !== 0
      ? (jsx = historyData.map(
          (video) =>
            video._id !== videoID && (
              <VideoCard key={video._id} video={video} width={videoCardWidth} />
            )
        ))
      : (jsx = (
          <div className="bg-yellow-300 h-[4rem] p-5 w-[30rem] flex justify-center">
            <p className="text-xl font-semibold text-yellow-700">
              Sorry ! its nothing here.
            </p>
          </div>
        ));
  }
  return { jsx, historyData };
};
