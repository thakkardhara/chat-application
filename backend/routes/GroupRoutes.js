import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import { createGroup, getGroups } from "../controller/GroupController.js";

const router = express.Router();

router.post("/create", protectRoutes, createGroup);
router.get("/", protectRoutes, getGroups);

export default router;