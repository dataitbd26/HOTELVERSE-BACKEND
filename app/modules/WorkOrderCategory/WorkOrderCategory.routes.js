import { Router } from "express";
import {
  createWorkOrderCategory,
  getAllWorkOrderCategories,
  getWorkOrderCategoryById,
  updateWorkOrderCategory,
  removeWorkOrderCategory,
} from "./WorkOrderCategory.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const WorkOrderCategoryRoutes = Router();

// Protect all routes with authentication middleware
WorkOrderCategoryRoutes.get("/", authenticateToken, getAllWorkOrderCategories);
WorkOrderCategoryRoutes.get("/get-id/:id", authenticateToken, getWorkOrderCategoryById);
WorkOrderCategoryRoutes.post("/post", authenticateToken, createWorkOrderCategory);
WorkOrderCategoryRoutes.put("/update/:id", authenticateToken, updateWorkOrderCategory);
WorkOrderCategoryRoutes.delete("/delete/:id", authenticateToken, removeWorkOrderCategory);

export default WorkOrderCategoryRoutes;
