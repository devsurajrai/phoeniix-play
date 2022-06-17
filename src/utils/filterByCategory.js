export const filterByCategory = (filterBy, videos) => {
  if (filterBy === "All") {
    return videos;
  }
  return videos?.filter((video) => {
    return video?.category?.toLowerCase() === filterBy?.toLowerCase();
  });
};
