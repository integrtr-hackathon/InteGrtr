import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    userPermissions: mongoose.Schema.Types.Mixed,
})

const roleSchema = new mongoose.Schema(
  {
    role_id: {
      type: Number,
      required: true,
      unique: true, 
      index: true,
    },
    role_name: {
      type: String,
      required: true,
    },
    role_type: {
      type: String,
      default: "RULE_BASE_ROLE",
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "active", "inactive"],
      default: "ACTIVE",
    },
    user_type: {
      type: String,
      required: false,
    },
    sub_domain: {
      type: String,
      required: false,
    },
    visibility_type: {
      type: String,
      default: "VISIBILITY",
    },
    created: {
      type: Date,
    },
    last_modified: {
      type: Date,
    },
    last_modified_utc: {
      type: String,
    },
    // Legacy fields for backward compatibility
    name: {
      type: String,
    },
    userType: {
      type: String,
    },
    rbpOnly: {
      type: Boolean,
      default: false,
    },
    lastModified: {
      type: Date,
    },
    actions: {
      type: [String],
      default: [],
    },
    permissions: permissionSchema,
    assignedGroups: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PermissionGroup'
    }],
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", roleSchema);
