// File: Organizations.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrganizationsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the organization name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the organization email address"],
      unique: true,
    },
    address: {
      city: {
        type: String,
        required: [true, "Please provide the city"],
      },
      postCode: {
        type: String,
        required: [true, "Please provide the post code"],
      },
      state: {
        type: String,
        required: [true, "Please provide the state"],
      },
    },
    phone: {
      type: String,
      required: [true, "Please provide the organization phone number"],
    },
    registrationNumber: {
      type: String,
      required: [true, "Please provide the registration number"],
    },
    ratePlan: {
      type: String,
      required: [true, "Please provide the rate plan"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    roomRates: {
      byDefault: {
        type: Number,
        default: 100,
      },
      roomType: {
        type: String,
        required: [true, "Please provide the room type"],
      },
      minDays: {
        type: Number,
        required: [true, "Please provide the minimum days"],
      },
      extraAdultRate: {
        type: Number,
        required: [true, "Please provide the extra adult rate"],
      },
      extraChildRate: {
        type: Number,
        required: [true, "Please provide the extra child rate"],
      },
    },
  },
  { timestamps: true }
);

const Organization = model("Organization", OrganizationsSchema);

export default Organization;
