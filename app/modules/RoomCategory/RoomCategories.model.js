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
    facility: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      required: [true, "Please provide the rate"],
    },
    person: {
      adult: {
        type: Number,
        required: [true, "Please provide the number of adults"],
      },
      child: {
        type: Number,
        default: 0,
      },
    },
    beddingType: {
      type: String,
      required: [true, "Please provide the bedding type"],
    },
  },
  { timestamps: true }
);

const RoomCategory = model("RoomCategory", RoomCategorySchema);

export default RoomCategory;