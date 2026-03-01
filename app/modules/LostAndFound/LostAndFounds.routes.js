import { Router } from "express";
import {
  getPaginatedLostAndFounds,
  getLostAndFoundById,
  createLostAndFound,
  updateLostAndFound,
  removeLostAndFound
} from "./LostAndFounds.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const router = Router();

// Protect all routes with authentication middleware
router.get("/", authenticateToken, getPaginatedLostAndFounds);
router.get("/get-id/:id", authenticateToken, getLostAndFoundById);
router.post("/post", authenticateToken, createLostAndFound);
router.put("/update/:id", authenticateToken, updateLostAndFound);
router.delete("/delete/:id", authenticateToken, removeLostAndFound);

export default router;