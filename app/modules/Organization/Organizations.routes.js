// File: Organizations.routes.js

import { Router } from "express";
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  removeOrganization,
  getSuperAdminOrganizations,
  getOrganizationsByBranch,
} from "./Organizations.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const OrganizationRoutes = Router();

// Protect all routes with authentication middleware
OrganizationRoutes.get("/", authenticateToken, getAllOrganizations);
OrganizationRoutes.get("/get-id/:id", authenticateToken, getOrganizationById);
OrganizationRoutes.post("/post", authenticateToken, createOrganization);
OrganizationRoutes.put("/update/:id", authenticateToken, updateOrganization);
OrganizationRoutes.delete("/delete/:id", authenticateToken, removeOrganization);
OrganizationRoutes.get("/branch/:branch", authenticateToken, getOrganizationsByBranch);
OrganizationRoutes.get("/superadmin/all", authenticateToken, getSuperAdminOrganizations);

export default OrganizationRoutes;
