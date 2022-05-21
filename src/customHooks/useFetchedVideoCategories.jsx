import { useDispatch, useSelector } from "react-redux";
import {
  selectVideoCategories,
  fetchVideoCategories,
} from "../redux/slice/videoCategoriesSlice";
import { useEffect } from "react";

export const useFetchedVideoCategories = () => {
  const dispatch = useDispatch();
  const videoCategories = useSelector(selectVideoCategories);

  useEffect(() => {
    dispatch(fetchVideoCategories());
  }, [dispatch]);
  return videoCategories;
};
