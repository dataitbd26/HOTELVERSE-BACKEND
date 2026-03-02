import { Router } from "express";
import {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  removeGuest,
} from "./Guest.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const GuestRoutes = Router();

// Protect all routes with authentication middleware
GuestRoutes.get("/", authenticateToken, getAllGuests);
GuestRoutes.get("/get-id/:id", authenticateToken, getGuestById);
GuestRoutes.post("/post", authenticateToken, createGuest);
GuestRoutes.put("/update/:id", authenticateToken, updateGuest);
GuestRoutes.delete("/delete/:id", authenticateToken, removeGuest);

export default GuestRoutes;