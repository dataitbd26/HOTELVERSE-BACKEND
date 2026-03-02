import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WorkOrderSchema = Schema(
  {
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
    detail: {
      order: {
        type: String,
        required: [true, "Please provide the order"],
      },
      roomUnit: {
        type: String, // Added to match the UI screenshot
        required: [true, "Please provide the Room/Unit"],
      },
      blockFrom: {
        type: Date,
      },
      blockTo: {
        type: Date,
      },
      deadline: {
        type: Date,
        required: [true, "Please provide the deadline date"],
      },
      houseStatus: {
        type: String,
        required: [true, "Please provide the house status"],
      },
    },
    workInformation: {
      workCategory: {
        type: String,
        required: [true, "Please provide the work category"],
      },
      complain: {
        type: String,
        required: [true, "Please provide the complain"],
      },
      description: {
        type: String,
        required: [true, "Please provide the description"],
      },
    },
    workStatusInfo: {
      assignTo: {
        type: String,
        required: [true, "Please provide the assigned person"],
      },
      priority: {
        type: String,
        required: [true, "Please provide the priority"],
      },
      status: {
        type: String,
        required: [true, "Please provide the status"],
      },
      workDone: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const WorkOrder = model("WorkOrder", WorkOrderSchema);

export default WorkOrder;