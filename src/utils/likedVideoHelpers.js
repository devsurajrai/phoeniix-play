export const isVideoInLikedVideos = (likedVideos, currentVideo) => {
  return likedVideos.some((video) => video._id === currentVideo._id);
};
