// File: Guests.routes.js

import { Router } from "express";
import {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  removeGuest,
  getSuperAdminGuests,
  getGuestsByBranch,
} from "./Guests.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const GuestRoutes = Router();

// Protect all routes with authentication middleware
GuestRoutes.get("/", authenticateToken, getAllGuests);
GuestRoutes.get("/get-id/:id", authenticateToken, getGuestById);
GuestRoutes.post("/post", authenticateToken, createGuest);
GuestRoutes.put("/update/:id", authenticateToken, updateGuest);
GuestRoutes.delete("/delete/:id", authenticateToken, removeGuest);
GuestRoutes.get("/branch/:branch", authenticateToken, getGuestsByBranch);
GuestRoutes.get("/superadmin/all", authenticateToken, getSuperAdminGuests);

export default GuestRoutes;
