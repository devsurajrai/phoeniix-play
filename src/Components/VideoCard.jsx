import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleAddToPlaylistModal } from "../redux/slice/addToPlaylistModalSlice";
import { AddToPlaylistModal } from "./addToPlaylistModal.jsx";
const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const { _id, title, thumbnail_url, like } = video;

  return (
    <>
      <div className="bg-slate-800 w-1/5 text-[#d9dde0] rounded-lg p-2">
        <Link to={`/videos/video/${_id}`}>
          <section className="p-2 cursor-pointer">
            {/* here goes the thumbnail  */}
            <div>
              <img
                src={thumbnail_url}
                className="rounded-md object-fill"
                alt="video-thumbnail"
              />
            </div>
            {/* here goes the video description  */}
            <h6 className="pt-2 truncate font-semibold hover:text-[#27AB83]">
              {title}
            </h6>
          </section>
        </Link>

        <footer className="text-2xl p-2 pb-3 flex justify-between ">
          <section className="text-sm flex items-center">Likes: {like}</section>
          <section>
            <i className="fa-solid fa-thumbs-up pr-3 cursor-pointer hover:text-[#27AB83]" />
            <i className="fa-solid fa-clock pr-3 cursor-pointer hover:text-[#27AB83]" />
            <i
              className="fa-solid fa-plus cursor-pointer hover:text-[#27AB83]
          "
              onClick={() => dispatch(toggleAddToPlaylistModal())}
              role="button"
            />
          </section>
        </footer>
        {/* Add to playlist modal  */}
        <AddToPlaylistModal />
      </div>
    </>
  );
};

export { VideoCard };
