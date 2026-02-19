// File: PaymentMethods.routes.js

import { Router } from "express";
import {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  removePaymentMethod,
  getSuperAdminPaymentMethods,
  getPaymentMethodsByBranch,
} from "./PaymentMethods.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const PaymentMethodRoutes = Router();

// Protect all routes with authentication middleware
PaymentMethodRoutes.get("/", authenticateToken, getAllPaymentMethods);
PaymentMethodRoutes.get("/get-id/:id", authenticateToken, getPaymentMethodById);
PaymentMethodRoutes.post("/post", authenticateToken, createPaymentMethod);
PaymentMethodRoutes.put("/update/:id", authenticateToken, updatePaymentMethod);
PaymentMethodRoutes.delete("/delete/:id", authenticateToken, removePaymentMethod);
PaymentMethodRoutes.get("/branch/:branch", authenticateToken, getPaymentMethodsByBranch);
PaymentMethodRoutes.get("/superadmin/all", authenticateToken, /* adminOnly, */ getSuperAdminPaymentMethods);

export default PaymentMethodRoutes;
