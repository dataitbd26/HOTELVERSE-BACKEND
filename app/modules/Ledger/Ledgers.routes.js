import { Router } from "express";
import {
  createLedger,
  getAllLedgers,
  getLedgerById,
  updateLedger,
  removeLedger,
  getSuperAdminLedgers,
  getLedgersByBranch,
} from "./Ledgers.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const LedgerRoutes = Router();

// Protect all routes with authentication middleware
LedgerRoutes.get("/", authenticateToken, getAllLedgers);
LedgerRoutes.get("/get-id/:id", authenticateToken, getLedgerById);
LedgerRoutes.post("/post", authenticateToken, createLedger);
LedgerRoutes.put("/update/:id", authenticateToken, updateLedger);
LedgerRoutes.delete("/delete/:id", authenticateToken, removeLedger);
LedgerRoutes.get("/branch/:branch", authenticateToken, getLedgersByBranch);
LedgerRoutes.get("/superadmin/all", authenticateToken, /* adminOnly, */ getSuperAdminLedgers);

export default LedgerRoutes;
