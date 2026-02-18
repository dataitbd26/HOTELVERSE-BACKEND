// File: StayInfos.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StayInfoSchema = Schema(
  {
    arrivalDate: {
      type: Date,
      required: [true, "Please provide the arrival date"],
    },
    departureDate: {
      type: Date,
      required: [true, "Please provide the departure date"],
    },
    night: {
      type: Number,
      required: [true, "Please provide the number of nights"],
    },
    room: {
      type: String,
      required: [true, "Please provide the room"],
    },
    roomNo: {
      type: String,
      required: [true, "Please provide the room number"],
    },
    status: {
      type: String,
      required: [true, "Please provide the status"],
    },
    notes: {
      type: String,
    },
    guest: {
      name: {
        type: String,
        required: [true, "Please provide the guest name"],
      },
      phone: {
        type: String,
        required: [true, "Please provide the guest phone number"],
      },
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const StayInfo = model("StayInfo", StayInfoSchema);

export default StayInfo;
