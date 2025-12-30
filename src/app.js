import express from "express";
import deviceRoutes from "./routes/device.routes.js";

const app = express();
app.use(express.json());

app.use("/api/device", deviceRoutes);

export default app;
