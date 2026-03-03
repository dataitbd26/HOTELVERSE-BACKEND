// BanquetSalesItem.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BanquetSalesItemSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the item name"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const BanquetSalesItem = model("BanquetSalesItem", BanquetSalesItemSchema);

export default BanquetSalesItem;