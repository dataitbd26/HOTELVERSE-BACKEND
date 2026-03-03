// Banquet.routes.js
import { Router } from "express";
import {
  createBanquet,
  getAllBanquets,
  getBanquetById,
  updateBanquet,
  removeBanquet,
  getBanquetsByBranch,
} from "./Banquet.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const BanquetRoutes = Router();

// Protect all routes with authentication middleware
BanquetRoutes.get("/", authenticateToken, getAllBanquets);
BanquetRoutes.get("/get-id/:id", authenticateToken, getBanquetById);
BanquetRoutes.post("/post", authenticateToken, createBanquet);
BanquetRoutes.put("/update/:id", authenticateToken, updateBanquet);
BanquetRoutes.delete("/delete/:id", authenticateToken, removeBanquet);
BanquetRoutes.get("/branch/:branch", authenticateToken, getBanquetsByBranch);

export default BanquetRoutes;