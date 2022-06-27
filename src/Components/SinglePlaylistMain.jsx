import { useEffect } from "react";
import { VideoCard } from "./VideoCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthInfo } from "../redux/slice/authSlice";
import { useParams } from "react-router-dom";
import {
  getPlaylist,
  selectSinglePlaylist,
} from "../redux/slice/singlePlaylistSlice";

const SinglePlaylistMain = () => {
  const dispatch = useDispatch();
  const { encodedToken } = useSelector(selectAuthInfo);
  const { playlistID } = useParams();
  const singlePlaylistData = useSelector(selectSinglePlaylist);
  useEffect(() => {
    console.log("fetching playlists");
    dispatch(getPlaylist({ playlistID, encodedToken }));
  }, [dispatch, encodedToken, playlistID]);
  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll">
      <div className="bg-[#334E68] mt-1 mb-3 fixed w-full text-[#F0F4F8] flex justify-between items-center">
        <section></section>
        <p className="font-bold  p-3 text-md mx-3">
          Total Videos:{singlePlaylistData?.videos?.length}
        </p>
      </div>
      <div className="flex gap-14 flex-wrap justify-center mt-[5rem] mb-[2rem]">
        {singlePlaylistData ? (
          singlePlaylistData?.videos?.map((video, idx) => (
            <VideoCard
              key={idx}
              video={video}
              width="w-1/5"
              isInPlaylist={true}
            />
          ))
        ) : (
          <div className="bg-yellow-300 h-[4rem] p-5 w-[30rem] flex justify-center">
            <p className="text-xl font-semibold text-yellow-700">
              This playlist is empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { SinglePlaylistMain };
