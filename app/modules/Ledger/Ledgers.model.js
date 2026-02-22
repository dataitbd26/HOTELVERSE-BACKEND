import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LedgerSchema = Schema(
  {
    ledger: {
      type: String,
      required: [true, "Please provide the ledger name"],
    },
    groupUnder: {
      type: String,
      required: [true, "Please provide the group under"],
    },
    creditLimits: {
      type: Number,
      required: [true, "Please provide the credit limits"],
    },
    creditDays: {
      type: Number,
      required: [true, "Please provide the credit days"],
    },
    contactPersonName: {
      type: String,
      required: [true, "Please provide the contact person name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide the phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email address"],
    },
    address: {
      city: {
        type: String,
        required: [true, "Please provide the city"],
      },
      state: {
        type: String,
        required: [true, "Please provide the state"],
      },
      postCode: {
        type: String,
        required: [true, "Please provide the post code"],
      },
    },
    country: {
      type: String,
      required: [true, "Please provide the country"],
    },
    accountHolderName: {
      type: String,
      required: [true, "Please provide the account holder name"],
    },
    accountNumber: {
      type: Number,
      required: [true, "Please provide the account number"],
    },
    routingNumber: {
      type: Number,
      required: [true, "Please provide the routing number"],
    },
    bankName: {
      type: String,
      required: [true, "Please provide the bank name"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Ledger = model("Ledger", LedgerSchema);

export default Ledger;
