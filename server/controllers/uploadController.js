const Upload = require("../models/Upload");

/**
 * Creates a new upload for a project
 */
const createUpload = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { type, source, transcript, createdAt } = req.body;

    const upload = new Upload({
      project: projectId,
      type,
      source,
      transcript,
      createdAt: createdAt || Date.now(),
    });

    await upload.save();
    res.status(201).json(upload);
  } catch (err) {
    res.status(500).json({ message: "Failed to create upload" });
  }
};

/**
 * Fetches all uploads for a project
 */
const getUploads = async (req, res) => {
  try {
    const { projectId } = req.params;
    const uploads = await Upload.find({ project: projectId });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
};

/**
 * Updates the transcript for a specific upload
 */
const updateTranscript = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const { transcript } = req.body;

    const updated = await Upload.findByIdAndUpdate(
      uploadId,
      { transcript },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update transcript" });
  }
};

// ✅ Now all functions are properly defined
module.exports = {
  createUpload,
  getUploads,
  updateTranscript,
};
