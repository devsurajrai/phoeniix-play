/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// the above es-lint rules have been disabled for this file, these are basically to enforce accessibility
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAddToPlaylistModal } from "../redux/slice/addToPlaylistModalSlice";
import { useState } from "react";
import { AddToPlaylistModal } from "./AddToPlaylistModal.jsx";
import {
  addLikedVideo,
  selectLikedVideoStatus,
  selectLikedVideoError,
  selectLikedVideos,
  setLikedVideoStatusToDefault,
} from "../redux/slice/likedVideoSlice.js";
import {
  selectWatchLaterError,
  selectWatchLaterStatus,
  addVideoToWatchLater,
  setWatchlaterStatusToDefault,
} from "../redux/slice/watchLaterSlice.js";
import {} from "../redux/slice/historySlice.js";
import {
  addVideoToHistory,
  selectHistory,
} from "../redux/slice/historySlice.js";
import { selectAuthInfo } from "../redux/slice/authSlice.js";
import { useEffect } from "react";
import { setToastData } from "../redux/slice/toastSlice";
import {
  videoCardHandlers,
  isVideoInLikedVideos,
} from "../utils/videoCardHandlers.js";
import { increaseVideoLikeCount } from "../redux/slice/videosSlice.js";
import { isVideoInHistory } from "../utils/historyHelpers.js";
import { removeHistoryVideo } from "../redux/slice/historySlice";
const VideoCard = ({ video, width }) => {
  const dispatch = useDispatch();
  const { _id, title, thumbnail_url, likes } = video;
  const { encodedToken } = useSelector(selectAuthInfo);
  const likedVideosData = useSelector(selectLikedVideos);
  const [currentVideo, setCurrentVideo] = useState(null);
  const historyVideoData = useSelector(selectHistory);
  const navigate = useNavigate();
  const isVideoPresentInHistory = isVideoInHistory(historyVideoData, video);
  // Like and Watchlater api response status and error
  const videoLikeStatus = useSelector(selectLikedVideoStatus);
  const videoLikeError = useSelector(selectLikedVideoError);
  const videoWatchLaterStatus = useSelector(selectWatchLaterStatus);
  const videoWatchLaterError = useSelector(selectWatchLaterError);
  // Like, watchlater and history click handlers
  const {
    addLikeVideoHandler,
    addWatchlaterVideoHandler,
    addHistoryVideoHandler,
  } = videoCardHandlers(
    dispatch,
    addVideoToWatchLater,
    addLikedVideo,
    addVideoToHistory
  );
  // useEffect for handling the toast behaviour
  useEffect(() => {
    if (videoLikeStatus === "idle") {
      setCurrentVideo(null);
    }
    if (videoLikeStatus === "finished") {
      // set the toast data to display on fulfilled api response
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: "Video Added To Likes",
          toastType: "success",
        })
      );
      // set the like video api response status from "finished" to "idle"
      dispatch(setLikedVideoStatusToDefault());
      // increase the like count of the video liked
      currentVideo && dispatch(increaseVideoLikeCount(currentVideo));
    }
    if (videoLikeStatus === "failed") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: videoLikeError,
          toastType: "error",
        })
      );
      dispatch(setLikedVideoStatusToDefault());
    }
    if (videoWatchLaterStatus === "finished") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: "Video added to Watchlater",
          toastType: "success",
        })
      );
      dispatch(setWatchlaterStatusToDefault());
    }
    if (videoWatchLaterStatus === "failed") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: videoWatchLaterError,
          toastType: "error",
        })
      );
      dispatch(setWatchlaterStatusToDefault());
    }
  }, [
    videoLikeStatus,
    videoLikeError,
    dispatch,
    videoWatchLaterError,
    videoWatchLaterStatus,
    currentVideo,
  ]);
  const cardClickHandler = (_id, video, encodedToken) => {
    !isVideoPresentInHistory && addHistoryVideoHandler(video, encodedToken);
    navigate(`/videos/video/${_id}`);
  };
  // finally returnig the video card
  return (
    <>
      <div className={`bg-slate-800  ${width} text-[#d9dde0] rounded-lg p-2`}>
        <section
          className="p-2 cursor-pointer"
          onClick={() => cardClickHandler(_id, video, encodedToken)}
        >
          {/* here goes the thumbnail  */}
          <div>
            <img
              src={thumbnail_url}
              className="rounded-md object-fill"
              alt="video-thumbnail"
            />
          </div>
          {/* here goes the video description  */}
          <h6 className="pt-2 truncate font-semibold hover:text-[#27AB83]">
            {title}
          </h6>
        </section>

        <footer
          className={`text-2xl p-2 pb-3 ${
            !isVideoPresentInHistory && "flex justify-between"
          } `}
        >
          <section className="text-sm flex items-center">
            {!isVideoPresentInHistory && <p>Likes: {likes}</p>}
          </section>
          <section>
            {!isVideoPresentInHistory ? (
              <>
                <i
                  className={`fa-solid fa-thumbs-up pr-3 cursor-pointer hover:text-[#27AB83] ${
                    isVideoInLikedVideos(likedVideosData, video) &&
                    "text-[#27AB83]"
                  }`}
                  onClick={() => {
                    setCurrentVideo(video);
                    addLikeVideoHandler(video, encodedToken);
                  }}
                />
                <i
                  className={`fa-solid fa-clock pr-3 cursor-pointer  hover:text-[#27AB83] `}
                  onClick={() => addWatchlaterVideoHandler(video, encodedToken)}
                />

                <i
                  className="fa-solid fa-plus cursor-pointer hover:text-[#27AB83]
          "
                  onClick={() => dispatch(toggleAddToPlaylistModal())}
                />
              </>
            ) : (
              <div className="w-full flex justify-center">
                <i
                  className="fa-solid fa-trash cursor-pointer hover:text-[#27AB83]"
                  onClick={() => {
                    console.log("removing video");
                    dispatch(removeHistoryVideo({ video, encodedToken }));
                  }}
                />
              </div>
            )}
          </section>
        </footer>
        {/* Add to playlist modal  */}
        <AddToPlaylistModal />
      </div>
    </>
  );
};

export { VideoCard };
