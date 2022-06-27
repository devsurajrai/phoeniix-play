/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
// the above es-lint rules have been disabled for this file, these are basically to enforce accessibility
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleAddToPlaylistModal,
  setVideoToAddToPlaylist,
} from "../redux/slice/addToPlaylistModalSlice";
import { setToastData } from "../redux/slice/toastSlice";

import {
  addLikedVideo,
  selectLikedVideos,
  removeLikedVideo,
  selectLikedVideoStatus,
  setLikedVideoStatusToDefault,
} from "../redux/slice/likedVideoSlice.js";
import {
  addVideoToWatchLater,
  selectWatchLater,
  removeWatchLaterVideo,
  selectWatchLaterStatus,
  setWatchlaterStatusToDefault,
} from "../redux/slice/watchLaterSlice.js";
import { useEffect } from "react";
import { selectAuthInfo } from "../redux/slice/authSlice.js";
import { videoCardHandlers } from "../utils/videoCardHandlers.js";
import { isVideoInWatchLater, isVideoInLikedVideos } from "../utils/utils";
import { removeHistoryVideo } from "../redux/slice/historySlice";
import { removeVideoFromPlaylist } from "../redux/slice/singlePlaylistSlice";
import { useParams } from "react-router-dom";

const LikeWatchlaterPlaylist = ({ video, isInHistory, isInPlaylist }) => {
  const dispatch = useDispatch();
  const { encodedToken, isUserLoggedIn } = useSelector(selectAuthInfo);
  const navigate = useNavigate();
  const { playlistID } = useParams();
  // Like and Watchlater states access
  const likedVideosData = useSelector(selectLikedVideos);
  const watchLaterVideoData = useSelector(selectWatchLater);
  const videoLikeStatus = useSelector(selectLikedVideoStatus);
  const videoWatchLaterStatus = useSelector(selectWatchLaterStatus);
  // check for the video in history,likes and watchlater
  const isVideoPresentInLikes = isVideoInLikedVideos(likedVideosData, video);
  const isVideoPresentInWatchLater = isVideoInWatchLater(
    watchLaterVideoData,
    video
  );

  // Like, watchlater and history click handlers
  const {
    addLikeVideoHandler,
    addWatchlaterVideoHandler,
    removeLikedVideoHandler,
    removeHistoryVideoHandler,
    removeWatchLaterVideoHandler,
  } = videoCardHandlers(
    dispatch,
    addVideoToWatchLater,
    addLikedVideo,
    removeLikedVideo,
    removeVideoFromPlaylist,
    removeWatchLaterVideo,
    removeHistoryVideo
  );
  const removeVideoFromPlaylistHandler = (
    videoID,
    playlistID,
    encodedToken
  ) => {
    dispatch(removeVideoFromPlaylist({ videoID, playlistID, encodedToken }));
  };
  // useEffect for handling the toast behaviour
  useEffect(() => {
    if (videoLikeStatus === "failed") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: "Something went wrong",
          toastType: "error",
        })
      );
      dispatch(setLikedVideoStatusToDefault());
    }
    if (videoWatchLaterStatus === "failed") {
      dispatch(
        setToastData({
          toastVisibility: true,
          toastText: "Something went wrong",
          toastType: "error",
        })
      );
      dispatch(setWatchlaterStatusToDefault());
    }
  }, [videoLikeStatus, videoWatchLaterStatus]);
  return (
    <section>
      {!isInHistory && !isInPlaylist ? (
        <>
          <i
            className={`fa-solid fa-thumbs-up pr-3 cursor-pointer hover:text-[#27AB83] ${
              isVideoPresentInLikes && "text-[#27AB83]"
            }`}
            onClick={() => {
              if (isUserLoggedIn) {
                !isVideoPresentInLikes
                  ? addLikeVideoHandler(video, encodedToken)
                  : removeLikedVideoHandler(video, encodedToken);
              } else {
                navigate("/login");
              }
            }}
          />
          <i
            className={`fa-solid fa-clock pr-3 cursor-pointer  hover:text-[#27AB83]
          ${isVideoPresentInWatchLater && "text-[#27AB83]"}
          `}
            onClick={() =>
              !isVideoPresentInWatchLater
                ? addWatchlaterVideoHandler(video, encodedToken)
                : removeWatchLaterVideoHandler(video, encodedToken)
            }
          />
          <i
            className="fa-solid fa-plus cursor-pointer hover:text-[#27AB83]
  "
            onClick={() => {
              if (isUserLoggedIn) {
                dispatch(setVideoToAddToPlaylist(video));
                dispatch(toggleAddToPlaylistModal());
              } else {
                navigate("/login");
              }
            }}
          />
        </>
      ) : (
        <div className="w-full flex justify-center">
          <i
            className="fa-solid fa-trash cursor-pointer hover:text-[#27AB83]"
            onClick={() => {
              !isInPlaylist
                ? removeHistoryVideoHandler(video, encodedToken)
                : removeVideoFromPlaylistHandler(
                    video._id,
                    playlistID,
                    encodedToken
                  );
            }}
          />
        </div>
      )}
    </section>
  );
};

export { LikeWatchlaterPlaylist };
