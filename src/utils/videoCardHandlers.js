export const videoCardHandlers = (
  dispatch,
  addVideoToWatchLater,
  addLikedVideo,
  addVideoToHistory,
  removeLikedVideo,
  removeHistoryVideo,
  removeWatchLaterVideo,
  removeVideoFromPlaylist
) => {
  const addLikeVideoHandler = (video, encodedToken) => {
    dispatch(addLikedVideo({ video, encodedToken }));
    return video;
  };
  const removeLikedVideoHandler = (video, encodedToken) => {
    const videoID = video._id;
    dispatch(removeLikedVideo({ videoID, encodedToken }));
  };
  const addWatchlaterVideoHandler = (video, encodedToken) => {
    dispatch(addVideoToWatchLater({ video, encodedToken }));
  };
  const removeWatchLaterVideoHandler = (video, encodedToken) => {
    const videoID = video._id;

    dispatch(removeWatchLaterVideo({ videoID, encodedToken }));
  };
  const addHistoryVideoHandler = (video, encodedToken) => {
    dispatch(addVideoToHistory({ video, encodedToken }));
  };
  const removeHistoryVideoHandler = (video, encodedToken) => {
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
