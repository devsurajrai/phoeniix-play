import { useFetchedVideoCategories } from "../customHooks/useFetchedVideoCategories.jsx";
import { useFetchedVideoData } from "../customHooks/useFetchedVideoData.jsx";

const VideoListingMain = () => {
  const { jsx, videoData } = useFetchedVideoData();
  const videoCategories = useFetchedVideoCategories();

  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll">
      <div className="bg-[#334E68] mt-1 mb-3 mx-2 fixed w-full text-[#F0F4F8] flex justify-between">
        <section className="flex items-center text-sm mx-3">
          {videoCategories.map((category) => {
            return (
              <div
                key={category._id}
                className="m-1 px-1 rounded-md border-2 border-[#27AB83] cursor-pointer  hover:bg-[#C6F7E2] hover:text-[#334E68] "
              >
                <span key={category._id}>{category.categoryName}</span>
              </div>
            );
          })}
        </section>
        <p className="font-bold text-[] p-3 text-md mx-3">
          Total Videos:{videoData.length}
        </p>
      </div>
      <div className="flex gap-14 flex-wrap justify-center mt-[5rem] mb-[2rem]">
        {jsx}
      </div>
    </div>
  );
};

export { VideoListingMain };
