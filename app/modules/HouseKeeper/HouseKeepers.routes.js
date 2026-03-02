import { Router } from "express";
import {
  createHouseKeeper,
  getAllHouseKeepers,
  getHouseKeeperById,
  updateHouseKeeper,
  removeHouseKeeper,
  getSuperAdminHouseKeepers,
} from "./HouseKeepers.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const HouseKeeperRoutes = Router();

// Protect all routes with authentication middleware
HouseKeeperRoutes.get("/", authenticateToken, getAllHouseKeepers);
HouseKeeperRoutes.get("/get-id/:id", authenticateToken, getHouseKeeperById);
HouseKeeperRoutes.post("/post", authenticateToken, createHouseKeeper);
HouseKeeperRoutes.put("/update/:id", authenticateToken, updateHouseKeeper);
HouseKeeperRoutes.delete("/delete/:id", authenticateToken, removeHouseKeeper);
HouseKeeperRoutes.get("/superadmin/all", authenticateToken, getSuperAdminHouseKeepers);

export default HouseKeeperRoutes;
