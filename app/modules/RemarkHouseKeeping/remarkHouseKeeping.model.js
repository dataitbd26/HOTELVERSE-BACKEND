// remarkHouseKeeping.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RemarkHouseKeepingSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the remark name"],
    },
    remark: {
      type: String,
      required: [true, "Please provide the remark description"],
    },
  },
  { timestamps: true }
);

const RemarkHouseKeeping = model("RemarkHouseKeeping", RemarkHouseKeepingSchema);

export default RemarkHouseKeeping;
