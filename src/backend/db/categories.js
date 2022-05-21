import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Beginners",
    description: "The videos are suitable for the beginner players.",
  },
  {
    _id: uuid(),
    categoryName: "Intermediate",
    description: "The videos are suitable for the beginner players.",
  },
  {
    _id: uuid(),
    categoryName: "Advanced",
    description: "The videos are suitable for the beginner players.",
  },
  {
    _id: uuid(),
    categoryName: "Top Tournaments",
    description: "The videos are from best tournaments happened.",
  },
];
