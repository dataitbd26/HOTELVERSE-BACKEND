

import mongoose from "mongoose";

const { Schema, model } = mongoose;
const RoomCategorySchema = Schema(
  {
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
    categoryName: {
      type: String,
      required: [true, "Please provide the category name"],
    },
  },
  { timestamps: true }
);

const RoomCategory = model("RoomCategory", RoomCategorySchema);

export default RoomCategory;
