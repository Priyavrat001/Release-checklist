import express from "express";
import {
  createRelease,
  getReleases,
  getReleaseById,
  toggleStep,
  updateReleaseInfo,
  deleteRelease,
} from "../controller/release.js";

const app = express.Router();

app.post("/", createRelease);
app.get("/", getReleases);
app.get("/:id", getReleaseById);
app.patch("/:id/step/:stepIndex", toggleStep);
app.patch("/:id/info", updateReleaseInfo);
app.delete("/:id", deleteRelease);

export default app;