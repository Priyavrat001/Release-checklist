import prisma from "../prisma/client.js";
import { defaultSteps } from "../constants/releaseSteps.js";
import { getReleaseStatus } from "../utils/releaseStatus.js";


// 1. CREATE RELEASE
const createRelease = async (req, res) => {
  try {
    const { name, dueDate, additionalInfo } = req.body;
    if(!name || !dueDate) {
     return res.status(400).json({
      success: false,
      mesage: "Name and due date are required fields"
     });
    };

    const release = await prisma.release.create({
      data: {
        name,
        dueDate: new Date(dueDate),
        additionalInfo,
        steps: defaultSteps,
      },
    });

    res.json({
      ...release,
      status: getReleaseStatus(release.steps),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 2. GET ALL RELEASES
const getReleases = async (req, res) => {
  try {
    const releases = await prisma.release.findMany({
      orderBy: { createdAt: "desc" },
    });

    if(!releases || releases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No releases found"
      });
    };

    const result = releases.map((r) => ({
      ...r,
      status: getReleaseStatus(r.steps),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 3. GET SINGLE RELEASE
const getReleaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const release = await prisma.release.findUnique({
      where: { id: Number(id) },
    });

    if (!release) {
      return res.status(404).json({ error: "Release not found" });
    };

    res.json({
      ...release,
      status: getReleaseStatus(release.steps),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 4. TOGGLE STEP (ON / OFF)
const toggleStep = async (req, res) => {
  try {
    const { id, stepIndex } = req.params;

    const release = await prisma.release.findUnique({
      where: { id: Number(id) },
    });

    if (!release) {
      return res.status(404).json({ error: "Release not found" });
    }

    const updatedSteps = release.steps.map((step, index) =>
      index === Number(stepIndex)
        ? { ...step, completed: !step.completed }
        : step
    );

    const updatedRelease = await prisma.release.update({
      where: { id: Number(id) },
      data: {
        steps: updatedSteps,
      },
    });

    res.json({
      ...updatedRelease,
      status: getReleaseStatus(updatedSteps),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. UPDATE RELEASE INFO
const updateReleaseInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { additionalInfo } = req.body;

    const updated = await prisma.release.update({
      where: { id: Number(id) },
      data: { additionalInfo },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. DELETE RELEASE
const deleteRelease = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.release.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Release deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export {
  createRelease,
  getReleases,
  getReleaseById,
  toggleStep,
  updateReleaseInfo,
  deleteRelease
};