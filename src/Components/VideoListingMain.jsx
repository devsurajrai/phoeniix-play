/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useFetchedVideoCategories } from "../customHooks/useFetchedVideoCategories.js";
import { useFetchedVideosData } from "../customHooks/useFetchedVideosData.js";
import { useState } from "react";

const VideoListingMain = () => {
  const [filterBy, setFilteraBy] = useState("All");
  const { jsx, filteredByCategoryVideos } = useFetchedVideosData({}, filterBy);
  const videoCategories = useFetchedVideoCategories();
  return (
    <div className="h-[calc(100vh-4rem)] overflow-scroll flex-col justify-center">
      <div className="bg-[#334E68] mt-1 mb-3  fixed w-full text-[#F0F4F8] flex justify-between">
        <section className="flex items-center text-sm mx-3">
          <div
            className={`
m-1 px-1  rounded-md border-2 border-[#27AB83] cursor-pointer  hover:bg-[#C6F7E2] hover:text-[#334E68] ${
              filterBy.toLowerCase() === "all" && "bg-[#C6F7E2] text-[#334E68]"
            }
`}
            onClick={() => setFilteraBy("All")}
          >
            <span>All</span>
          </div>
          {videoCategories.map((category) => {
            return (
              <div
                key={category._id}
                className={`
m-1 px-1 rounded-md border-2 border-[#27AB83] cursor-pointer  hover:bg-[#C6F7E2] hover:text-[#334E68] ${
                  filterBy?.toLowerCase() ===
                    category?.categoryName?.toLowerCase() &&
                  "bg-[#C6F7E2] text-[#334E68]"
                }
`}
                onClick={() => setFilteraBy(category.categoryName)}
              >
                <span key={category._id}>{category.categoryName}</span>
              </div>
            );
          })}
        </section>
        <p className="font-bold  p-3 text-md mx-3">
          Total Videos:{filteredByCategoryVideos.length}
        </p>
      </div>
      <div className="flex gap-14 flex-wrap justify-center mt-[5rem] mb-[2rem]">
        {jsx}
      </div>
    </div>
  );
};

export { VideoListingMain };
