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


RoomCategoryRoutes.get("/", getAllRoomCategories);

RoomCategoryRoutes.get("/get-id/:id", authenticateToken, getRoomCategoryById);
RoomCategoryRoutes.post("/post", authenticateToken, createRoomCategory);
RoomCategoryRoutes.put("/update/:id", authenticateToken, updateRoomCategory);
RoomCategoryRoutes.delete("/delete/:id", authenticateToken, removeRoomCategory);

RoomCategoryRoutes.get("/branch/:branch", getRoomCategoriesByBranch);

export default RoomCategoryRoutes;
