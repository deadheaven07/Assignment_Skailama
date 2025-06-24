const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  type: { type: String, enum: ["rss", "youtube", "mp3"], required: true },
  source: { type: String, required: true }, // YouTube link or file name or RSS
  transcript: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Upload", uploadSchema);
