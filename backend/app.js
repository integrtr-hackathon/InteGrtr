import express from "express";
import dotenv from "dotenv";
import { connection } from "./database/connection.js";
import groupRoutes from "./routes/groups.routes.js";
import roleRoutes from "./routes/roles.routes.js";
import permissionGroupRoutes from "./routes/permissionGroup.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

connection();

app.get("/", (req, res) => {
  res.send("✅ SAP SuccessFactors Scraper API running");
});

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permission-groups", permissionGroupRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
