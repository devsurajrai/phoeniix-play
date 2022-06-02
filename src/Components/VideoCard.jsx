/* eslint-disable react-hooks/exhaustive-deps */
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
  removeLikedVideo,
} from "../redux/slice/likedVideoSlice.js";
import {
  selectWatchLaterError,
  selectWatchLaterStatus,
  addVideoToWatchLater,
  setWatchlaterStatusToDefault,
  selectWatchLater,
  removeWatchLaterVideo,
} from "../redux/slice/watchLaterSlice.js";
import {} from "../redux/slice/historySlice.js";
import {
  addVideoToHistory,
  selectHistory,
} from "../redux/slice/historySlice.js";
import { selectAuthInfo } from "../redux/slice/authSlice.js";
import { useEffect } from "react";
import {
  setToastData,
  setToastText,
  selectToastText,
} from "../redux/slice/toastSlice";
import { videoCardHandlers } from "../utils/videoCardHandlers.js";
import {
  increaseVideoLikeCount,
  decreaseVideoLikeCount,
} from "../redux/slice/videosSlice.js";
import {
  isVideoInHistory,
  isVideoInWatchLater,
  isVideoInLikedVideos,
} from "../utils/utils";
import { removeHistoryVideo } from "../redux/slice/historySlice";
import {
  selectHistoryStatus,
  setHistoryStatusToDefault,
} from "../redux/slice/historySlice";
const VideoCard = ({ video, width, isInHistory }) => {
  const dispatch = useDispatch();
  const { _id, title, thumbnail_url, likes } = video;
  const { encodedToken } = useSelector(selectAuthInfo);

  const [currentVideo, setCurrentVideo] = useState(null);
  const navigate = useNavigate();

  // Like and Watchlater states access
  const videoLikeStatus = useSelector(selectLikedVideoStatus);
  const videoLikeError = useSelector(selectLikedVideoError);
  const videoWatchLaterStatus = useSelector(selectWatchLaterStatus);
  const videoWatchLaterError = useSelector(selectWatchLaterError);
  const toastText = useSelector(selectToastText);
  const historyStatus = useSelector(selectHistoryStatus);
  const likedVideosData = useSelector(selectLikedVideos);
  const historyVideoData = useSelector(selectHistory);
  const watchLaterVideoData = useSelector(selectWatchLater);
  // check for the video in history,likes and watchlater
  const isVideoPresentInHistory = isVideoInHistory(historyVideoData, video);
  const isVideoPresentInLikes = isVideoInLikedVideos(likedVideosData, video);
  const isVideoPresentInWatchLater = isVideoInWatchLater(
    watchLaterVideoData,
    video
  );
  // Like, watchlater and history click handlers
  const {
    addLikeVideoHandler,
    addWatchlaterVideoHandler,
    addHistoryVideoHandler,
    removeLikedVideoHandler,
    removeHistoryVideoHandler,
    removeWatchLaterVideoHandler,
  } = videoCardHandlers(
    dispatch,
    addVideoToWatchLater,
    addLikedVideo,
    addVideoToHistory,
    removeLikedVideo,
    setToastText,
    removeHistoryVideo,
    removeWatchLaterVideo,
    removeWatchLaterVideo
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
          toastText: toastText,
          toastType: "success",
        })
      );
      // set the like video api response status from "finished" to "idle"
      dispatch(setLikedVideoStatusToDefault());
      // increase the like count of the video liked
      if (currentVideo) {
        !isVideoPresentInLikes
          ? dispatch(decreaseVideoLikeCount(currentVideo))
          : dispatch(increaseVideoLikeCount(currentVideo));
      }
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
          toastText: toastText,
          toastType: "success",
        })
      );
      console.log(toastText);
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
    if (historyStatus === "finished") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: toastText,
          toastType: "success",
        })
      );
      dispatch(setHistoryStatusToDefault());
    }
  }, [videoLikeStatus, videoWatchLaterStatus]);
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
            !isInHistory && "flex justify-between"
          } `}
        >
          <section className="text-sm flex items-center">
            {!isInHistory && <p>Likes: {likes}</p>}
          </section>
          <section>
            {!isInHistory ? (
              <>
                <i
                  className={`fa-solid fa-thumbs-up pr-3 cursor-pointer hover:text-[#27AB83] ${
                    isVideoPresentInLikes && "text-[#27AB83]"
                  }`}
                  onClick={() => {
                    setCurrentVideo(video);
                    !isVideoPresentInLikes
                      ? addLikeVideoHandler(video, encodedToken)
                      : removeLikedVideoHandler(video, encodedToken);
                  }}
                />
                <i
                  className={`fa-solid fa-clock pr-3 cursor-pointer  hover:text-[#27AB83]
                  ${isVideoPresentInWatchLater && "text-[#27AB83]"}
                  `}
                  onClick={() => {
                    !isVideoPresentInWatchLater
                      ? addWatchlaterVideoHandler(video, encodedToken)
                      : removeWatchLaterVideoHandler(video, encodedToken);
                  }}
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
                    removeHistoryVideoHandler(video, encodedToken);
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
