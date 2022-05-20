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
  BuildComponents,
} from "./pages/pages";
import { Routes, Route } from "react-router-dom";
import { Header, PublicRoute, RequiresAuth } from "./Components/components";
import { Sidebar } from "./Components/SideBar/SideBar.jsx";

export const App = () => (
  <div className="relative height-[100vh] overflow-hidden">
    {/* Header will be visible on each page. */}
    <Header />
    <Sidebar />

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
        path="/videos/video/:id"
        element={
          <PublicRoute>
            <Video />
          </PublicRoute>
        }
      />
      <Route
        path="/build-components"
        element={
          <PublicRoute>
            <BuildComponents />
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
        path="/playlists/playlist/:id"
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
