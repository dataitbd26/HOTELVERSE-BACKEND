import { Router } from "express";
import {
  createWorkOrderCategory,
  getAllWorkOrderCategories,
  getWorkOrderCategoryById,
  updateWorkOrderCategory,
  removeWorkOrderCategory,
  getWorkOrderCategoriesByBranch,
} from "./WorkOrderCategory.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; // Adjust path if needed

const WorkOrderCategoryRoutes = Router();

// Protect all routes with authentication middleware
WorkOrderCategoryRoutes.get("/", authenticateToken, getAllWorkOrderCategories);
WorkOrderCategoryRoutes.get("/get-id/:id", authenticateToken, getWorkOrderCategoryById);
WorkOrderCategoryRoutes.post("/post", authenticateToken, createWorkOrderCategory);
WorkOrderCategoryRoutes.put("/update/:id", authenticateToken, updateWorkOrderCategory);
WorkOrderCategoryRoutes.delete("/delete/:id", authenticateToken, removeWorkOrderCategory);
WorkOrderCategoryRoutes.get("/branch/:branch", authenticateToken, getWorkOrderCategoriesByBranch);

export default WorkOrderCategoryRoutes;