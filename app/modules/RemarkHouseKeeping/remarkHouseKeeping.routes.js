// remarkHouseKeeping.routes.js
import { Router } from "express";
import {
  createRemark,
  getAllRemarks,
  getRemarkById,
  updateRemark,
  removeRemark,
} from "./remarkHouseKeeping.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const RemarkHouseKeepingRoutes = Router();

// Protect all routes with authentication middleware
RemarkHouseKeepingRoutes.get("/", authenticateToken, getAllRemarks);
RemarkHouseKeepingRoutes.get("/get-id/:id", authenticateToken, getRemarkById);
RemarkHouseKeepingRoutes.post("/post", authenticateToken, createRemark);
RemarkHouseKeepingRoutes.put("/update/:id", authenticateToken, updateRemark);
RemarkHouseKeepingRoutes.delete("/delete/:id", authenticateToken, removeRemark);

export default RemarkHouseKeepingRoutes;
