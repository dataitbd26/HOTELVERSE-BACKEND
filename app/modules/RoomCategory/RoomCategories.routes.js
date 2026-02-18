// File: RoomCategories.routes.js

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

const RoomCategoryRoutes = Router();

// Public route to get all room categories - adjust if authentication is needed
RoomCategoryRoutes.get("/", getAllRoomCategories);

// Authenticated routes
RoomCategoryRoutes.get("/get-id/:id", authenticateToken, getRoomCategoryById);
RoomCategoryRoutes.post("/post", authenticateToken, createRoomCategory);
RoomCategoryRoutes.put("/update/:id", authenticateToken, updateRoomCategory);
RoomCategoryRoutes.delete("/delete/:id", authenticateToken, removeRoomCategory);

// Public route to get room categories by branch - adjust if needed
RoomCategoryRoutes.get("/branch/:branch", getRoomCategoriesByBranch);

export default RoomCategoryRoutes;
