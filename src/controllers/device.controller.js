import fs from "fs";
import path from "path";
import mqttClient from "../config/mqtt.js";

const dbPath = path.join(process.cwd(), "src/db/devices.json");

/* ---------- DB HELPERS ---------- */

const readDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const ensureDeviceExists = (db, deviceId) => {
  if (!db[deviceId]) {
    db[deviceId] = {
      id: deviceId,
      name: deviceId,
      state: "OFF",
      lastUpdated: null
    };
  }
};

/* ---------- CONTROL DEVICE ---------- */
export const controlDevice = (req, res) => {
  const { deviceId, action } = req.params;
  

  if (!["on", "off"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  const command = action.toUpperCase();
  const db = readDB();

  // ✅ auto register
  ensureDeviceExists(db, deviceId);

  // ✅ publish MQTT
  mqttClient.publish(`home/${deviceId}/cmd`, command);

  // ✅ update state
  db[deviceId].state = command;
  db[deviceId].lastUpdated = new Date().toISOString();

  writeDB(db);

  res.json({
    success: true,
    deviceId,
    state: command
  });
};

/* ---------- GET DEVICE ---------- */
export const getDeviceState = (req, res) => {
  const { deviceId } = req.params;
  const db = readDB();

  if (!db[deviceId]) {
    return res.status(404).json({ error: "Device not found" });
  }

  res.json(db[deviceId]);
};
