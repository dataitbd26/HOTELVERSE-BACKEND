import mongoose from "mongoose";

const remarkHouseKeepingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    remark: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RemarkHouseKeeping = mongoose.model("RemarkHouseKeeping", remarkHouseKeepingSchema);

export default RemarkHouseKeeping;