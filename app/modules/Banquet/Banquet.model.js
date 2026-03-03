// Banquet.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BanquetSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the banquet name"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Please provide the capacity"],
      min: [1, "Capacity must be at least 1"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Banquet = model("Banquet", BanquetSchema);

export default Banquet;