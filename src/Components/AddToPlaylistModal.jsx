/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  isAddToPlaylistModalVisible,
  toggleAddToPlaylistModal,
  videoToBeAddedToPlaylist,
} from "../redux/slice/addToPlaylistModalSlice";
import {
  isCreatePlaylistModalVisible,
  toggleCreatePlaylistModal,
} from "../redux/slice/createPlaylistModalSlice";
import { Input } from "./components.js";
import { useState } from "react";
import { playlistHelpers } from "../utils/playlistHelpers";
import {
  createPlaylist,
  selectPlaylists,
  addVideoToPlaylist,
} from "../redux/slice/createPlaylistSlice";
import { selectAuthInfo } from "../redux/slice/authSlice";

const AddToPlaylistModal = () => {
  const playlists = useSelector(selectPlaylists);
  const isAddToPlaylistModalShown = useSelector(isAddToPlaylistModalVisible);
  const dispatch = useDispatch();
  const currentLocation = useLocation();
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDescription, setplaylistDescription] = useState("");

  const [playlistId, setPlaylistID] = useState("");
  const isCreatePlaylistModalShown = useSelector(isCreatePlaylistModalVisible);
  const { encodedToken } = useSelector(selectAuthInfo);
  const videoToAddToPlaylist = useSelector(videoToBeAddedToPlaylist);
  const { createUserPlaylist, addVideoIntoPlaylist } = playlistHelpers(
    dispatch,
    createPlaylist,
    encodedToken,
    toggleAddToPlaylistModal,
    toggleCreatePlaylistModal,
    currentLocation,
    addVideoToPlaylist
  );

  return (
    <div>
      {/* here is the add to playlist modal  */}
      <div
        className={`w-screen h-screen bg-black absolute top-[4rem] left-0  opacity-50 overflow-hidden  ${
          !isAddToPlaylistModalShown && "hidden"
        }`}
        onClick={() => dispatch(toggleAddToPlaylistModal())}
      ></div>
      <div
        className={`w-2/5 h-2/5 px-20 bg-white rounded-xl absolute top-1/4 left-1/3  ${
          !isAddToPlaylistModalShown && "hidden"
        } flex flex-col justify-between items-center a p-[2rem]`}
      >
        {isCreatePlaylistModalShown ||
        currentLocation.pathname === "/playlists" ? (
          <>
            <Input
              placeholder="What do you want to name this Playlist?"
              callback={(e) => setPlaylistTitle(e.target.value)}
            />
            <Input
              placeholder="Any discription about it?"
              callback={(e) => setplaylistDescription(e.target.value)}
            />
          </>
        ) : (
          <select
            name="add_to_playlist"
            className="text-[#334E68] border-2 border-[#334E68] focus:outline-none w-1/2 h-[2.2rem] px-2 rounded-md "
            onChange={(e) => setPlaylistID(e.target.value)}
            value={playlistId}
          >
            <option>Select Playlist</option>
            {playlists.map((playlist, index) => (
              <option key={index} value={playlist._id}>
                {playlist.title}
              </option>
            ))}
          </select>
        )}
        <div className="flex justify-center w-full">
          {isCreatePlaylistModalShown ||
          currentLocation.pathname === "/playlists" ? (
            <>
              <button
                className="btn-sm-primary w-1/2"
                onClick={() => {
                  createUserPlaylist(playlistTitle, playlistDescription);
                }}
              >
                Create Playlist
              </button>
            </>
          ) : (
            <div className="flex-col w-1/2 items-center ">
              <button
                className="btn-sm-primary w-full mb-3"
                onClick={() =>
                  addVideoIntoPlaylist(videoToAddToPlaylist, playlistId)
                }
              >
                Add
              </button>

              <button
                className="btn-sm-primary w-full mb-3"
                onClick={() => {
                  dispatch(toggleCreatePlaylistModal());
                }}
              >
                Create New Playlist
              </button>
            </div>
          )}
        </div>
      </div>
      {/* modal ends here  */}
    </div>
  );
};

export { AddToPlaylistModal };
