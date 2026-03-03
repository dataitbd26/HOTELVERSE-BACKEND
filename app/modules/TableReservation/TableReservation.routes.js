// TableReservation.routes.js
import { Router } from "express";
import { getAll, getById, create, update, remove } from "./TableReservation.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/", getAll);
router.get("/get-id/:id", getById);
router.post("/post", create);
router.put("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;