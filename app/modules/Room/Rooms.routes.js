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

const router = Router();

router.get("/", authenticateToken, getAllRooms);
router.get("/get-id/:id", authenticateToken, getRoomById);
router.post("/post", authenticateToken, createRoom);
router.put("/update/:id", authenticateToken, updateRoom);
router.delete("/delete/:id", authenticateToken, removeRoom);

router.get("/branch/:branch", authenticateToken, getRoomsByBranch);

export default router;