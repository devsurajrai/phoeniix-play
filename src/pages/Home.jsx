import { NavLink } from "react-router-dom";
const Home = () => {
  let activeStyle = {
    fontWeight: "bold",
  };
  return (
    <div className="flex flex-col gap-2 p-3">
      <NavLink
        style={({ isActive }) => {
          return isActive ? activeStyle : undefined;
        }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={(isActive) => {
          isActive ? activeStyle : undefined;
        }}
        to="/history"
      >
        History
      </NavLink>
      <NavLink to="/liked">Liked</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/playlists">Playlists</NavLink>
      <NavLink to="/playlists/playlist/abc">Playlist</NavLink>
      <NavLink to="/videos">Video Listing</NavLink>
      <NavLink to="/video/1234">Video</NavLink>
      <NavLink to="/watch-later">WatchLater</NavLink>
    </div>
  );
};

export { Home };
