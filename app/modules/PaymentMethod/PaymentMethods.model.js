// File: PaymentMethods.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentMethodSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the payment method name"],
    },
    status: {
      type: String,
      required: [true, "Please provide the status"],
    },
    type: {
      type: String,
      required: [true, "Please provide the payment method type"],
    },
    ledger: {
      type: String,
      required: [true, "Please provide the ledger"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const PaymentMethod = model("PaymentMethod", PaymentMethodSchema);

export default PaymentMethod;
