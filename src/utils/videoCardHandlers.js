export const videoCardHandlers = (
  dispatch,
  addVideoToWatchLater,
  addLikedVideo,
  addVideoToHistory
) => {
  const addLikeVideoHandler = (video, encodedToken) => {
    dispatch(addLikedVideo({ video, encodedToken }));
    return video;
  };
  const addWatchlaterVideoHandler = (video, encodedToken) => {
    dispatch(addVideoToWatchLater({ video, encodedToken }));
  };
  const addHistoryVideoHandler = (video, encodedToken) => {
    dispatch(addVideoToHistory({ video, encodedToken }));
  };
  return {
    addLikeVideoHandler,
    addWatchlaterVideoHandler,
    addHistoryVideoHandler,
  };
};

export const isVideoInLikedVideos = (likedVideos, currentVideo) => {
  return likedVideos.some((video) => video._id === currentVideo._id);
};
