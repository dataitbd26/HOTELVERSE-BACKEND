// BanquetSalesItem.routes.js
import { Router } from "express";
import {
  createBanquetSalesItem,
  getAllBanquetSalesItems,
  getBanquetSalesItemById,
  updateBanquetSalesItem,
  removeBanquetSalesItem,
} from "./BanquetSalesItem.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const BanquetSalesItemRoutes = Router();

// Protect all routes with authentication middleware
BanquetSalesItemRoutes.get("/", authenticateToken, getAllBanquetSalesItems);
BanquetSalesItemRoutes.get("/get-id/:id", authenticateToken, getBanquetSalesItemById);
BanquetSalesItemRoutes.post("/post", authenticateToken, createBanquetSalesItem);
BanquetSalesItemRoutes.put("/update/:id", authenticateToken, updateBanquetSalesItem);
BanquetSalesItemRoutes.delete("/delete/:id", authenticateToken, removeBanquetSalesItem);

export default BanquetSalesItemRoutes;