import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  isSideBarVisible,
  toggleSidebar,
} from "../../redux/slice/sideBarSlice";

const Sidebar = () => {
  const isSidebarShown = useSelector(isSideBarVisible);
  const dispatch = useDispatch();
  let activeStyle = {
    fontWeight: "bold",
  };
  return (
    <>
      <div
        className={`h-screen w-screen absolute top-0
      bg-black opacity-40
      ${!isSidebarShown && "hidden"}
         `}
        onClick={() => dispatch(toggleSidebar())}
        role="button"
      ></div>

      <div
        className={`w-[20rem] h-screen bg-[#334E68] text-white pl-5 absolute top-0  ${
          !isSidebarShown ? "-left-[20rem]" : "left-0"
        } transition-all duration-400 z-10 `}
      >
        <button
          className="btn-sm-secondary border-none text-3xl p-3   rounded-sm hover:hover:bg-[#334E68] hover:text-[#d9dde0]"
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="fa-solid fa-bars" />
        </button>
        <nav className="flex flex-col pl-3 gap-4  text-[1.2rem] ">
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            to="/"
            onClick={() => dispatch(toggleSidebar())}
          >
            <i className="fa-solid fa-house pr-3" />
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            to="/history"
            onClick={() => dispatch(toggleSidebar())}
          >
            <i className="fa-solid fa-clock-rotate-left pr-3" />
            History
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            to="/liked"
            onClick={() => dispatch(toggleSidebar())}
          >
            <i className="fa-solid fa-thumbs-up pr-3" /> Liked Videos
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            to="/playlists"
            onClick={() => dispatch(toggleSidebar())}
          >
            <i className="fa-solid fa-book-open pr-3" /> Playlists
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            to="/videos"
            onClick={() => dispatch(toggleSidebar())}
          >
            <i className="fa-solid fa-video pr-3" /> Videos
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            to="/watch-later"
            onClick={() => dispatch(toggleSidebar())}
          >
            <i className="fa-solid fa-clock pr-3" /> Watch Later
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export { Sidebar };
