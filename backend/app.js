import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./database/connection.js";
import groupRoutes from "./routes/groups.routes.js";
import roleRoutes from "./routes/roles.routes.js";
import permissionGroupRoutes from "./routes/permissionGroup.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

// CORS middleware - Allow frontend to access backend
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

connection();

app.get("/", (_req, res) => {
  res.send("✅ SAP SuccessFactors Scraper API running");
});

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permission-groups", permissionGroupRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware (must be last)
import { errorHandler, notFound } from "./middleware/errorHandler.js";
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
