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
      country: {
        type: String,
      },
      district: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
    },
    phone: {
      type: String,
      required: [true, "Please provide the organization phone number"],
    },
    companyLicenseNumber: {
      type: String,
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
    addAsLedger: {
      type: Boolean,
      default: false,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    }
  },
  { timestamps: true }
);

const Organization = model("Organization", OrganizationsSchema);

export default Organization;