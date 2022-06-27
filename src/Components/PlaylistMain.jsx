/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toggleAddToPlaylistModal } from "../redux/slice/addToPlaylistModalSlice";
import { selectAuthInfo } from "../redux/slice/authSlice";
import { useState } from "react";
import {
  removePlaylist,
  selectPlaylists,
} from "../redux/slice/createPlaylistSlice";

const PlaylistMain = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const { encodedToken } = useSelector(selectAuthInfo);
  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll">
      <div className="bg-[#334E68] mt-1 mb-3 fixed w-full text-[#F0F4F8] flex justify-between items-center">
        <div className="m-1 px-3 mx-3 rounded-md border-2 border-[#27AB83] cursor-pointer  hover:bg-[#C6F7E2] hover:text-[#334E68] ">
          <button onClick={() => dispatch(toggleAddToPlaylistModal())}>
            Create Playlist
          </button>
        </div>
        <p className="font-bold  p-3 text-md mx-3">
          Total Playlists:{playlists.length}
        </p>
      </div>
      <div
        className={`flex gap-14 flex-wrap ${
          playlists.length !== 0 ? "justify-start" : "justify-center"
        } p-12 mt-[3rem] mb-[2rem] `}
      >
        {/* {here goes the playlists } */}
        {playlists.length !== 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.title}
              className="bg-[#334E68] text-white  w-[20vw] flex-col p-3   cursor-pointer tracking-wider truncate"
            >
              <Link to={`/playlists/playlist/${playlist._id}`}>
                <div>
                  <h1 className="text-4xl py-2"> {playlist.title}</h1>
                  <p className="truncate font-thin">{playlist.description}</p>
                </div>
              </Link>

              <div className="w-full  flex justify-end">
                <i
                  className="fa-solid fa-trash cursor-pointer hover:text-[#27AB83]

                  "
                  onClick={() => {
                    const playlistID = playlist._id;
                    dispatch(removePlaylist({ playlistID, encodedToken }));
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-yellow-300 h-[4rem] p-5 w-[30rem] flex justify-center">
            <p className="text-xl font-semibold text-yellow-700">
              You don't have any playlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { PlaylistMain };
