import express from "express";
import {
  controlDevice,
  getDeviceState
} from "../controllers/device.controller.js";

const router = express.Router();

// ONE clean control endpoint
router.post("/devices/:deviceId/:action", controlDevice);

// Read state
router.get("/devices/:deviceId", getDeviceState);

export default router;
