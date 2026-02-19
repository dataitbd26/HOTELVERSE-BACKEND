import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WorkOrderCategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the category name"],
    },
  },
  { timestamps: true }
);

const WorkOrderCategory = model("WorkOrderCategory", WorkOrderCategorySchema);

export default WorkOrderCategory;
