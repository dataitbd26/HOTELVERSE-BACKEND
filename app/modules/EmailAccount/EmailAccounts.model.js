import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmailAccountSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide the email address"],
      unique: true,
    },
    displayName: {
      type: String,
      required: [true, "Please provide the display name"],
    },
    host: {
      type: String,
      required: [true, "Please provide the host"],
    },
    port: {
      type: Number,
      required: [true, "Please provide the port number"],
    },
    username: {
      type: String,
      required: [true, "Please provide the username"],
    },
    password: {
      type: String,
      required: [true, "Please provide the password"],
    },
    ssl: {
      type: Boolean,
      required: [true, "Please specify if SSL is enabled"],
    },
    useDefaultCredential: {
      type: Boolean,
      required: [true, "Please specify if default credential is used"],
    },
    adminEmail: {
      type: String,
    },
    active: {
      type: Boolean,
      required: [true, "Please specify if the account is active"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const EmailAccount = model("EmailAccount", EmailAccountSchema);

export default EmailAccount;