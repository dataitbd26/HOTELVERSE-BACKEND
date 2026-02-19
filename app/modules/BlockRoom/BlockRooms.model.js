import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BlockRoomSchema = Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Please provide the room number"],
    },
    dateFrom: {
      type: Date,
      required: [true, "Please provide the start date"],
    },
    dateTo: {
      type: Date,
      required: [true, "Please provide the end date"],
    },
    reason: {
      type: String,
      required: [true, "Please provide the reason"],
    },
  },
  { timestamps: true }
);

const BlockRoom = model("BlockRoom", BlockRoomSchema);

export default BlockRoom;
