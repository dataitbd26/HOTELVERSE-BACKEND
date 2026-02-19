import { Router } from "express";
import {
  createWorkOrder,
  getAllWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  removeWorkOrder,
  getSuperAdminWorkOrders,
  getWorkOrdersByWorkCategory,
} from "./WorkOrders.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const WorkOrderRoutes = Router();

// Protect all routes with authentication middleware
WorkOrderRoutes.get("/", authenticateToken, getAllWorkOrders);
WorkOrderRoutes.get("/get-id/:id", authenticateToken, getWorkOrderById);
WorkOrderRoutes.post("/post", authenticateToken, createWorkOrder);
WorkOrderRoutes.put("/update/:id", authenticateToken, updateWorkOrder);
WorkOrderRoutes.delete("/delete/:id", authenticateToken, removeWorkOrder);
WorkOrderRoutes.get("/work-category/:workCategory", authenticateToken, getWorkOrdersByWorkCategory);
WorkOrderRoutes.get("/superadmin/all", authenticateToken, getSuperAdminWorkOrders);

export default WorkOrderRoutes;
