import { VideoCard } from "./VideoCard.jsx";
import { videos } from "../backend/db/videos.js";
const VideoListingMain = () => {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll">
      <p className="font-bold p-3 text-xl">Total Videos: {videos.length}</p>
      <section className="flex gap-14 flex-wrap justify-center">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </section>
    </div>
  );
};

export { VideoListingMain };
