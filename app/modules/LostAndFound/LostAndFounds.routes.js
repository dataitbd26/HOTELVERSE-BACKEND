import { Router } from "express";
import {
  createLostAndFound,
  getAllLostAndFounds,
  getLostAndFoundById,
  updateLostAndFound,
  removeLostAndFound,
  getSuperAdminLostAndFounds,
  getLostAndFoundsByRoom,
} from "./LostAndFounds.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const LostAndFoundRoutes = Router();

// Protect all routes with authentication middleware
LostAndFoundRoutes.get("/", authenticateToken, getAllLostAndFounds);
LostAndFoundRoutes.get("/get-id/:id", authenticateToken, getLostAndFoundById);
LostAndFoundRoutes.post("/post", authenticateToken, createLostAndFound);
LostAndFoundRoutes.put("/update/:id", authenticateToken, updateLostAndFound);
LostAndFoundRoutes.delete("/delete/:id", authenticateToken, removeLostAndFound);
LostAndFoundRoutes.get("/room/:room", authenticateToken, getLostAndFoundsByRoom);
LostAndFoundRoutes.get("/superadmin/all", authenticateToken, getSuperAdminLostAndFounds);

export default LostAndFoundRoutes;
