import express from 'express'
import { getMsg, sendMsg } from '../controller/MessageController.js';
import protectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();

router.post("/send/:id",protectRoutes,sendMsg)
router.get("/:id",protectRoutes,getMsg)


export default router;