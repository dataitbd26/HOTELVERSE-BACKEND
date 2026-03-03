// TableReservation.model.js
import { Schema, model } from "mongoose";

const tableReservationSchema = new Schema(
  {
    branch: { 
      type: String, 
      required: [true, "Please provide the branch"] 
    },
    outlet: { 
      type: String, 
      required: [true, "Please provide an outlet"] 
    },
    date: { 
      type: String, 
      required: [true, "Please provide a date"] 
    },
    time: { 
      type: String, 
      required: [true, "Please provide a time"] 
    },
    guestName: { 
      type: String, 
      required: [true, "Please provide the guest name"] 
    },
    phoneNumber: { 
      type: String, 
      required: [true, "Please provide a phone number"] 
    },
    email: { 
      type: String,
      default: ""
    },
    city: { 
      type: String,
      default: ""
    },
    guestCount: { 
      type: Number, 
      required: [true, "Please provide the guest count"],
      default: 0 
    }
  },
  { timestamps: true }
);

export default model("TableReservation", tableReservationSchema);