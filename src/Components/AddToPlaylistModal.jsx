import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isAddToPlaylistModalVisible,
  toggleAddToPlaylistModal,
} from "../redux/slice/addToPlaylistModalSlice";

const AddToPlaylistModal = () => {
  const isAddToPlaylistModalShown = useSelector(isAddToPlaylistModalVisible);
  const dispatch = useDispatch();
  return (
    <div>
      {/* here is the add to playlist modal  */}
      <div
        className={`w-screen h-screen bg-black absolute top-[4rem] left-0  opacity-10 overflow-hidden  ${
          !isAddToPlaylistModalShown && "hidden"
        }`}
        onClick={() => dispatch(toggleAddToPlaylistModal())}
      ></div>
      <div
        className={`w-2/5 h-2/5 bg-white rounded-xl absolute top-1/4 left-1/3  ${
          !isAddToPlaylistModalShown && "hidden"
        } flex flex-col justify-between items-center a p-[2rem]`}
      >
        <select
          name="add_to_playlist"
          className="text-[#334E68] border-2 border-[#334E68] focus:outline-none w-1/2 h-[2.2rem] px-2 rounded-md re"
        >
          <option value="my_playlist">My Playlist</option>
          <option value="shubham's_playlist">Shubham's Playlist</option>
        </select>
        <div className="flex justify-center w-full">
          <button
            className="btn-sm-primary w-1/2"
            onClick={() => dispatch(toggleAddToPlaylistModal())}
          >
            Add
          </button>
        </div>
      </div>
      {/* modal ends here  */}
    </div>
  );
};

export { AddToPlaylistModal };
