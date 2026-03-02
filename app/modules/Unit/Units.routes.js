import { Router } from "express";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  removeUnit,
  getSuperAdminUnits,
  getUnitsByBranch,
} from "./Units.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const UnitRoutes = Router();

// Protect all routes with authentication middleware
UnitRoutes.get("/", authenticateToken, getAllUnits);
UnitRoutes.get("/get-id/:id", authenticateToken, getUnitById);
UnitRoutes.post("/post", authenticateToken, createUnit);
UnitRoutes.put("/update/:id", authenticateToken, updateUnit);
UnitRoutes.delete("/delete/:id", authenticateToken, removeUnit);
UnitRoutes.get("/branch/:branch", authenticateToken, getUnitsByBranch);
UnitRoutes.get("/superadmin/all", authenticateToken, /* adminOnly, */ getSuperAdminUnits);

export default UnitRoutes;