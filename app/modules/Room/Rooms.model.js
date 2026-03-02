import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RoomSchema = Schema(
  {
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
      trim: true,
    },
    roomName: {
      type: String,
      required: [true, "Please provide the room name"],
      trim: true,
    },
    roomCategory: {
      type: Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: [true, "Please provide the room category"],
    },
    bookingStatus: {
      type: String,
      enum: ["occupied", "vacant", "blocked"],
      default: "vacant",
    },
    roomSituation: {
      type: String,
      enum: ["clear", "stay over", "due out", "cleared"],
      default: "clear",
    },
    roomPhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Room = model("Room", RoomSchema);

export default Room;