import { Router } from "express";
import {
  createWorkOrder,
  getAllWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  removeWorkOrder,
} from "./WorkOrders.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const WorkOrderRoutes = Router();

// Protect all routes with authentication middleware
WorkOrderRoutes.get("/superadmin/all", authenticateToken, getAllWorkOrders); // Adjusted to match the Hook API call
WorkOrderRoutes.get("/get-id/:id", authenticateToken, getWorkOrderById);
WorkOrderRoutes.post("/post", authenticateToken, createWorkOrder);
WorkOrderRoutes.put("/update/:id", authenticateToken, updateWorkOrder);
WorkOrderRoutes.delete("/delete/:id", authenticateToken, removeWorkOrder);

export default WorkOrderRoutes;