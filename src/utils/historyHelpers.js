export const isVideoInHistory = (lookIn, lookFor) =>
  lookIn.some((lookInVideo) => lookInVideo._id === lookFor._id);
