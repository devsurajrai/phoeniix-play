export const playlistHelpers = (
  dispatch,
  createPlaylist,
  encodedToken,
  toggleAddToPlaylistModal,
  toggleCreatePlaylistModal,
  currentLocation,
  addVideoToPlaylist
) => {
  const createUserPlaylist = (playlistTitle, playlistDescription) => {
    dispatch(
      createPlaylist({ playlistTitle, playlistDescription, encodedToken })
    );
    if (currentLocation.pathname === "/playlists") {
      dispatch(toggleAddToPlaylistModal());
    } else {
      dispatch(toggleCreatePlaylistModal());
    }
  };
  const addVideoIntoPlaylist = (video, playlistID) => {
    dispatch(addVideoToPlaylist({ video, playlistID, encodedToken }));
    dispatch(toggleAddToPlaylistModal());
  };
  return {
    createUserPlaylist,
    addVideoIntoPlaylist,
  };
};
