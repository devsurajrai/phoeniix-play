import {
  Video,
  WatchLater,
  VideoListing,
  Playlists,
  Playlist,
  Signup,
  Login,
  Liked,
  History,
  Home,
} from "./pages/pages";

export const App = () => (
  <>
    {/* These are the Public Pages */}
    <Home />
    <Login />
    <VideoListing />
    <Video />
    <Signup />
    {/* These are the private pages */}
    <History />
    <Liked />
    <Playlist />
    <Playlists />
    <WatchLater />
  </>
);
