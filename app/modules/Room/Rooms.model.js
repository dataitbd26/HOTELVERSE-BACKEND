import mongoose from "mongoose";

const { Schema, model } = mongoose;
const RoomSchema = Schema(
  {
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
    roomName: {
      type: String,
      required: [true, "Please provide the room name"],
    },
    roomCategory: {
      type: String,
      required: [true, "Please provide the room category"],
    },
    bookingStatus: {
      type: String,
      enum: ["occupied", "vacant", "blocked"],
      default: "vacant",
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
    rate: {
      type: Number,
      required: [true, "Please provide the rate"],
    },
    roomSituation: {
      type: String,
      enum: ["clear", "stay over", "due out", "cleared"],
      default: "clear",
    },
    roomPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

const Room = model("Room", RoomSchema);

export default Room;