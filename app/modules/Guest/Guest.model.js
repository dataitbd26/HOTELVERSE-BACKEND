import mongoose from "mongoose";

const { Schema, model } = mongoose;

const GuestSchema = Schema(
  {
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
    guestNamePrefix: {
      type: String,
      default: "Mr.",
    },
    guestName: {
      type: String,
      required: [true, "Please provide the guest name"],
    },
    photo: {
      type: String,
    },
    phoneCode: {
      type: String,
      default: "+968",
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide the phone number"],
    },
    email: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    postCode: {
      type: String,
    },
    country: {
      type: String,
      default: "Oman",
    },
    guestType: {
      type: String,
      enum: ["Adult", "Child"],
      default: "Adult",
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    nationality: {
      type: String,
    },
    identityType: {
      type: String,
    },
    idNumber: {
      type: String,
    },
    organisation: {
      type: String,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    preferenceNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Guest = model("Guest", GuestSchema);

export default Guest;