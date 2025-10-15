import express from "express";
import {
  getPermissionGroups,
  getPermissionGroupById,
  createPermissionGroup,
  updatePermissionGroup,
  deletePermissionGroup,
  linkRoleToGroup,
  unlinkRoleFromGroup,
} from "../controllers/permissionGroup.controller.js";

const router = express.Router();

router.get("/", getPermissionGroups);
router.get("/:id", getPermissionGroupById);
router.post("/", createPermissionGroup);
router.put("/:id", updatePermissionGroup);
router.delete("/:id", deletePermissionGroup);
router.post("/:id/link-role", linkRoleToGroup);
router.delete("/:id/unlink-role/:roleId", unlinkRoleFromGroup);

export default router;
