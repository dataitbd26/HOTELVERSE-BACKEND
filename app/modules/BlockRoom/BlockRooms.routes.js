import { Router } from "express";
import {
  createBlockRoom,
  getAllBlockRooms,
  getBlockRoomById,
  updateBlockRoom,
  removeBlockRoom,
  getSuperAdminBlockRooms,
  getBlockRoomsByRoomNumber,
} from "./BlockRooms.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const BlockRoomRoutes = Router();

// Protect all routes with authentication middleware
BlockRoomRoutes.get("/", authenticateToken, getAllBlockRooms);
BlockRoomRoutes.get("/get-id/:id", authenticateToken, getBlockRoomById);
BlockRoomRoutes.post("/post", authenticateToken, createBlockRoom);
BlockRoomRoutes.put("/update/:id", authenticateToken, updateBlockRoom);
BlockRoomRoutes.delete("/delete/:id", authenticateToken, removeBlockRoom);
BlockRoomRoutes.get("/room/:roomNumber", authenticateToken, getBlockRoomsByRoomNumber);
BlockRoomRoutes.get("/superadmin/all", authenticateToken, getSuperAdminBlockRooms);

export default BlockRoomRoutes;
