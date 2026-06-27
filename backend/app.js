import express from "express";
import cors from "cors";
import releaseRoutes from "./routes/release.js";
import dotenv from "dotenv";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({}));

app.use("/api/v1/releases", releaseRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
