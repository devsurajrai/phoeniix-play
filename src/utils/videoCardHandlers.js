export const videoCardHandlers = (
  dispatch,
  addVideoToWatchLater,
  addLikedVideo,
  addVideoToHistory,
  removeLikedVideo,
  setToastText,
  removeHistoryVideo,
  removeWatchLaterVideo,
  removeVideoFromPlaylist
) => {
  const addLikeVideoHandler = (video, encodedToken) => {
    dispatch(setToastText("Video Added To Likes"));
    dispatch(addLikedVideo({ video, encodedToken }));
    return video;
  };
  const removeLikedVideoHandler = (video, encodedToken) => {
    const videoID = video._id;
    dispatch(setToastText("Video Removed From Likes"));
    dispatch(removeLikedVideo({ videoID, encodedToken }));
  };
  const addWatchlaterVideoHandler = (video, encodedToken) => {
    dispatch(setToastText("Video Added To WatchLater"));
    dispatch(addVideoToWatchLater({ video, encodedToken }));
  };
  const removeWatchLaterVideoHandler = (video, encodedToken) => {
    const videoID = video._id;
    dispatch(setToastText("Video Removed Form Watchlater"));
    dispatch(removeWatchLaterVideo({ videoID, encodedToken }));
  };
  const addHistoryVideoHandler = (video, encodedToken) => {
    dispatch(addVideoToHistory({ video, encodedToken }));
  };
  const removeHistoryVideoHandler = (video, encodedToken) => {
    setToastText("Video Removed Form History");
    dispatch(removeHistoryVideo({ video, encodedToken }));
  };
  const removeVideoFromPlaylistHandler = (
    videoID,
    playlistID,
    encodedToken
  ) => {
    dispatch(removeVideoFromPlaylist({ videoID, playlistID, encodedToken }));
  };

  return {
    addLikeVideoHandler,
    addWatchlaterVideoHandler,
    addHistoryVideoHandler,
    removeLikedVideoHandler,
    removeHistoryVideoHandler,
    removeWatchLaterVideoHandler,
    removeVideoFromPlaylistHandler,
  };
};
