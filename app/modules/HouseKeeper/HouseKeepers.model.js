import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HouseKeeperSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the house keeper name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide the house keeper phone number"],
    },
    language: {
      type: String,
      required: [true, "Please provide the language"],
    },
  },
  { timestamps: true }
);

const HouseKeeper = model("HouseKeeper", HouseKeeperSchema);

export default HouseKeeper;
