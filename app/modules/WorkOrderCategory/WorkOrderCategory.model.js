// WorkOrderCategory.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WorkOrderCategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the category name"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const WorkOrderCategory = model("WorkOrderCategory", WorkOrderCategorySchema);

export default WorkOrderCategory;