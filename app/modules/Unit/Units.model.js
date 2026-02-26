import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UnitSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the unit name"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Unit = model("Unit", UnitSchema);

export default Unit;