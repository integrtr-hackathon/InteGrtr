import dotenv from "dotenv";
import { connection } from "../database/connection.js";
import { seedSampleData } from "../utils/seedData.js";

dotenv.config();

const runSeed = async () => {
  try {
    await connection();
    console.log("🔄 Starting data seeding...");
    await seedSampleData();
    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
