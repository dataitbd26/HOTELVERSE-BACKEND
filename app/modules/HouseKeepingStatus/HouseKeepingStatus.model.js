import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HouseKeepingStatusSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the status name"],
    },
    colorCode: {
      type: String,
      required: [true, "Please provide the color code"],
    },
    isDirty: {
      type: Boolean,
      required: [true, "Please specify if dirty or not"],
    },
  },
  { timestamps: true }
);

const HouseKeepingStatus = model("HouseKeepingStatus", HouseKeepingStatusSchema);

export default HouseKeepingStatus;
