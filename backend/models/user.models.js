import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: String,
    jobTitle: String,
    location: String,
    country: String,
    gender: String,
    division: String,
    userType: {
      type: String,
      default: "Employee",
    },
    groupIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PermissionGroup'
    }],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
