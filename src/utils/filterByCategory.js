export const filterByCategory = (filterBy, videos) => {
  // console.log("filterBy", filterBy);
  if (filterBy === "All") {
    return videos;
  }
  return videos?.filter((video) => {
    return video?.category?.toLowerCase() === filterBy?.toLowerCase();
  });
};
