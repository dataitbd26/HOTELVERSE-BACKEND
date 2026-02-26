import { Router } from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  removeRoom,
  getRoomsByBranch,
} from "./Rooms.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const RoomRoutes = Router();

// Public route to get all rooms - adjust if authentication is needed
RoomRoutes.get("/", getAllRooms);

// Authenticated routes
RoomRoutes.get("/get-id/:id", authenticateToken, getRoomById);
RoomRoutes.post("/post", authenticateToken, createRoom);
RoomRoutes.put("/update/:id", authenticateToken, updateRoom);
RoomRoutes.delete("/delete/:id", authenticateToken, removeRoom);

// Public route to get rooms by branch - adjust if needed
RoomRoutes.get("/branch/:branch", getRoomsByBranch);

export default RoomRoutes;