import express from "express";
import { turnOn, turnOff } from "../controllers/device.controller.js";

const router = express.Router();

router.post("/on", turnOn);
router.post("/off", turnOff);

export default router;
