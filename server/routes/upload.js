const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createUpload,
  getUploads,
  updateTranscript,
} = require("../controllers/uploadController");

router.use(authMiddleware);

// Upload routes
router.post("/:projectId", createUpload);
router.get("/:projectId", getUploads);

// Transcript update route
router.put("/:uploadId/transcript", updateTranscript);

module.exports = router;
