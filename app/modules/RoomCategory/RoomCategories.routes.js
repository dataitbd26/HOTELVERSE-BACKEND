import { Router } from "express";
import {
  createRoomCategory,
  getAllRoomCategories,
  getRoomCategoryById,
  updateRoomCategory,
  removeRoomCategory,
  getRoomCategoriesByBranch,
} from "./RoomCategories.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const router = Router();

router.get("/", authenticateToken, getAllRoomCategories);
router.get("/get-id/:id", authenticateToken, getRoomCategoryById);
router.post("/post", authenticateToken, createRoomCategory);
router.put("/update/:id", authenticateToken, updateRoomCategory);
router.delete("/delete/:id", authenticateToken, removeRoomCategory);
router.get("/branch/:branch", authenticateToken, getRoomCategoriesByBranch);

export default router;