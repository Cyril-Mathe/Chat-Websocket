import express from "express";
import { postChat, getAllChat, deleteLogById } from "../controllers/controllersChat.js";

const router = express.Router()

router.post('/', postChat)
router.get('/', getAllChat)
router.delete('/:id', deleteLogById)

export default router;