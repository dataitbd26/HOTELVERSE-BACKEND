// File: StayInfos.routes.js

import { Router } from "express";
import {
  createStayInfo,
  getAllStayInfos,
  getStayInfoById,
  updateStayInfo,
  removeStayInfo,
  getSuperAdminStayInfos,
  getStayInfosByBranch,
} from "./StayInfos.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const StayInfoRoutes = Router();

// Protect all routes with authentication middleware
StayInfoRoutes.get("/", authenticateToken, getAllStayInfos);
StayInfoRoutes.get("/get-id/:id", authenticateToken, getStayInfoById);
StayInfoRoutes.post("/post", authenticateToken, createStayInfo);
StayInfoRoutes.put("/update/:id", authenticateToken, updateStayInfo);
StayInfoRoutes.delete("/delete/:id", authenticateToken, removeStayInfo);
StayInfoRoutes.get("/branch/:branch", authenticateToken, getStayInfosByBranch);
StayInfoRoutes.get("/superadmin/all", authenticateToken, getSuperAdminStayInfos);

export default StayInfoRoutes;
