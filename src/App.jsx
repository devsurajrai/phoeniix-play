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
import { Routes, Route } from "react-router-dom";

import {
  Header,
  PublicRoute,
  RequiresAuth,
  Toast,
  Sidebar,
} from "./Components/components";

import { AddToPlaylistModal } from "./Components/components";
export const App = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header will be visible on each page. */}
      <Header />
      {/* These are the components which will appear only when specific event happens */}
      <Sidebar />
      <Toast />
      <AddToPlaylistModal />
      {/* These are the varipus routes of the video library app */}
      <Routes>
        {/* These are the Public Pages */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <Signup>
              <VideoListing />
            </Signup>
          }
        />

        <Route
          path="/videos"
          element={
            <PublicRoute>
              <VideoListing />
            </PublicRoute>
          }
        />
        <Route
          path="/videos/video/:videoID"
          element={
            <PublicRoute>
              <Video />
            </PublicRoute>
          }
        />
        {/* These are the private pages */}
        <Route
          path="/history"
          element={
            <RequiresAuth>
              <History />
            </RequiresAuth>
          }
        />
        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <Liked />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlists"
          element={
            <RequiresAuth>
              <Playlists />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlists/playlist/:playlistID"
          element={
            <RequiresAuth>
              <Playlist />
            </RequiresAuth>
          }
        />
        <Route
          path="/watch-later"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
};
