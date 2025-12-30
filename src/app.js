import express from "express";
import path from "path";
import deviceRoutes from "./routes/device.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// API
app.use("/api", deviceRoutes);

// UI
app.get("/", (req, res) => {
  res.render("index");
});

export default app;
