const Project = require("../models/Project");
const Upload = require("../models/Upload");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      user: req.user.id,
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// New: Get projects with file count and last edited date
const getProjectsSummary = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    const summaries = await Promise.all(
      projects.map(async (project) => {
        const uploads = await Upload.find({ project: project._id }).sort({
          updatedAt: -1,
        });
        let lastEdited = project.createdAt;
        if (uploads.length > 0) {
          lastEdited =
            uploads[0].updatedAt || uploads[0].createdAt || project.createdAt;
        }
        return {
          _id: project._id,
          name: project.name,
          fileCount: uploads.length,
          lastEdited: lastEdited
            ? new Date(lastEdited).toISOString()
            : new Date(project.createdAt).toISOString(),
        };
      })
    );
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    // Delete all uploads for this project
    await Upload.deleteMany({ project: project._id });
    // Delete the project
    await project.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectsSummary,
  deleteProject,
};
