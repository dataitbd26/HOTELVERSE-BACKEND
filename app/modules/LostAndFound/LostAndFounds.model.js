import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LostAndFoundSchema = Schema(
  {
    itemDetail: {
      room: {
        type: String,
        required: [true, "Please provide the room"],
      },
      reservation: {
        type: String,
        required: [true, "Please provide the reservation"],
      },
      item: {
        type: String,
        required: [true, "Please provide the item"],
      },
      description: {
        type: String,
        required: [true, "Please provide the description"],
      },
      foundedBy: {
        type: String,
        required: [true, "Please provide who found the item"],
      },
      foundedOn: {
        type: Date,
        required: [true, "Please provide the founded date"],
      },
    },
    claimDetail: {
      claimedBy: {
        type: String,
      },
      phone: {
        type: String,
      },
      claimedOn: {
        type: Date,
      },
    },
    returnDetail: {
      returnTo: {
        type: String,
      },
      returnedOn: {
        type: Date,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      remark: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const LostAndFound = model("LostAndFound", LostAndFoundSchema);

export default LostAndFound;
