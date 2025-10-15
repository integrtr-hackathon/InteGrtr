import mongoose from "mongoose";

const criteriaSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
}, { _id: false });

const permissionGroupSchema = new mongoose.Schema(
  {
    groupId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: "Employee",
    },
    type: {
      type: String,
      enum: ["Static", "Dynamic"],
      default: "Dynamic",
    },
    isRbpOnly: {
      type: Boolean,
      default: false,
    },
    activeMembershipCount: {
      type: Number,
      default: 0,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    includeCriteria: [criteriaSchema],
    excludeCriteria: [criteriaSchema],
    relatedPermissionRoles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }],
    lastModified: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const PermissionGroup = mongoose.model("PermissionGroup", permissionGroupSchema);
