const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectsSummary,
  deleteProject,
} = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", createProject);
router.get("/", getProjects);
router.get("/summary", getProjectsSummary);
router.delete("/:id", deleteProject);

module.exports = router;
