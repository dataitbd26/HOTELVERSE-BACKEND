// File: Guests.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GuestSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the guest name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide the guest phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide the guest email address"],
      unique: true,
    },
    address: {
      state: {
        type: String,
        required: [true, "Please provide the state"],
      },
      postCode: {
        type: String,
        required: [true, "Please provide the post code"],
      },
      city: {
        type: String,
        required: [true, "Please provide the city"],
      },
    },
    guestType: {
      type: String,
      required: [true, "Please provide the guest type"],
    },
    gender: {
      type: String,
      required: [true, "Please provide the gender"],
    },
    nationality: {
      type: String,
      required: [true, "Please provide the nationality"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide the date of birth"],
    },
    identity: {
      type: String,
      required: [true, "Please provide the identity type"],
    },
    identityNumber: {
      type: String,
      required: [true, "Please provide the identity number"],
    },
    organization: {
      type: String,
      required: [true, "Please provide the organization"],
    },
  },
  { timestamps: true }
);

const Guest = model("Guest", GuestSchema);

export default Guest;
