import express from "express";
import cors from "cors";
import releaseRoutes from "./routes/release.js";
import dotenv from "dotenv";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS blocked"));
    },
    credentials: true,
  })
);

app.use("/api/v1/releases", releaseRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});