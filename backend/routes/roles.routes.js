import express from "express";
import multer from "multer";
import { getRoles, importRoles, getRoleById } from "../controllers/role.controller.js";

const router = express.Router();
const upload = multer();

router.post("/import", upload.single("raw"), importRoles);
router.get("/", getRoles);
router.get("/:id", getRoleById);

export default router;