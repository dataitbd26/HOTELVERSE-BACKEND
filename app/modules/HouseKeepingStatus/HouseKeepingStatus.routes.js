import { Router } from "express";
import {
  createHouseKeepingStatus,
  getAllHouseKeepingStatuses,
  getHouseKeepingStatusById,
  updateHouseKeepingStatus,
  removeHouseKeepingStatus,
  getSuperAdminHouseKeepingStatuses,
} from "./HouseKeepingStatus.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const HouseKeepingStatusRoutes = Router();

// Protect all routes with authentication middleware
HouseKeepingStatusRoutes.get("/", authenticateToken, getAllHouseKeepingStatuses);
HouseKeepingStatusRoutes.get("/get-id/:id", authenticateToken, getHouseKeepingStatusById);
HouseKeepingStatusRoutes.post("/post", authenticateToken, createHouseKeepingStatus);
HouseKeepingStatusRoutes.put("/update/:id", authenticateToken, updateHouseKeepingStatus);
HouseKeepingStatusRoutes.delete("/delete/:id", authenticateToken, removeHouseKeepingStatus);
HouseKeepingStatusRoutes.get("/superadmin/all", authenticateToken, getSuperAdminHouseKeepingStatuses);

export default HouseKeepingStatusRoutes;
