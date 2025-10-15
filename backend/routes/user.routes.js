import express from "express";
import multer from "multer";
import {
  getUsers,
  getUserById,
  importUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/import", upload.single("raw"), importUsers);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
