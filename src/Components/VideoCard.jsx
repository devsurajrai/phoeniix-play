/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// the above es-lint rules have been disabled for this file, these are basically to enforce accessibility
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addVideoToHistory,
  selectHistory,
} from "../redux/slice/historySlice.js";
import { selectAuthInfo } from "../redux/slice/authSlice.js";

import { isVideoInHistory } from "../utils/historyHelpers";
import { LikeWatchlaterPlaylist } from "./LikeWatchlaterPlaylist.jsx";
const VideoCard = ({
  video,
  width,
  isInHistory = false,
  isInPlaylist = false,
}) => {
  const dispatch = useDispatch();
  const { _id, title, thumbnail_url, likes } = video;
  const { encodedToken } = useSelector(selectAuthInfo);
  const navigate = useNavigate();
  // Like and Watchlater states access
  const historyVideoData = useSelector(selectHistory);
  // check for the video in history
  const isVideoPresentInHistory = isVideoInHistory(historyVideoData, video);
  // Like, watchlater and history click handlers
  const addHistoryVideoHandler = (video, encodedToken) => {
    dispatch(addVideoToHistory({ video, encodedToken }));
  };

  const cardClickHandler = (_id, video, encodedToken) => {
    !isVideoPresentInHistory && addHistoryVideoHandler(video, encodedToken);
    navigate(`/videos/video/${_id}`);
  };
  // finally returnig the video card
  return (
    <>
      <div
        className={`bg-slate-800  ${width} text-[#d9dde0] rounded-lg flex flex-col justify-between p-2`}
      >
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
          <h6 className="pt-2  font-semibold hover:text-[#27AB83]">{title}</h6>
        </section>

        <footer
          className={`text-2xl p-2 pb-3 ${
            !isInHistory && !isInPlaylist && "flex justify-between"
          } `}
        >
          <section className="text-sm flex items-center">
            {!isInHistory && !isInPlaylist ? <p>Likes: {likes}</p> : ""}
          </section>
          <section>
            <LikeWatchlaterPlaylist
              video={video}
              isInHistory={isInHistory}
              isInPlaylist={isInPlaylist}
            />
          </section>
        </footer>
      </div>
    </>
  );
};

export { VideoCard };
