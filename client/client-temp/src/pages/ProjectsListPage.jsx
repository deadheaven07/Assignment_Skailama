import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import Logo from '../images/Logo.svg';
import SettingIcon from '../images/settingIcon.png';
import NotificationsIcon from '../images/notificationsIcon.png';
import Group16 from '../images/Group 16.svg';

const ProjectsListPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects/summary");
      setProjects(res.data);
    } catch (err) {
      // handle error
    }
  };

  const handleCreateProject = async (projectName) => {
    try {
      await api.post("/projects", { name: projectName });
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(projects.filter(p => p._id !== projectId));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  // Empty state Figma style
  if (projects.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
        {/* Header with Logo and Icons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 64px 0 64px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="Logo" style={{ height: 48, marginRight: 16 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <img src={SettingIcon} alt="Settings" style={{ width: 32, height: 32 }} />
            <img src={NotificationsIcon} alt="Notifications" style={{ width: 32, height: 32 }} />
          </div>
        </div>
        {/* Centered Empty State */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
          <h1 style={{ color: "#8F2FFF", fontWeight: 700, fontSize: 48, marginBottom: 24, textAlign: "center" }}>Create a New Project</h1>
          <img src={Group16} alt="Podcast Illustration" style={{ width: 340, maxWidth: "90vw", marginBottom: 32 }} />
          <div style={{ color: "#888", fontSize: 18, maxWidth: 700, textAlign: "center", marginBottom: 36 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: "#22143A", color: "#fff", fontWeight: 600, fontSize: 22, borderRadius: 8, padding: "16px 36px", border: "none", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(34,20,58,0.08)", marginTop: 8 }}
          >
            <span style={{ fontSize: 28, fontWeight: 700, marginRight: 8 }}>+</span> Create New Project
          </button>
        </div>
        {showModal && <CreateProjectModal onClose={() => setShowModal(false)} onCreate={handleCreateProject} />}
      </div>
    );
  }

  return (
    <>
      {/* Hide vertical scrollbar unless needed */}
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #fff;
        }
        .projects-main-content {
          overflow-y: auto;
          height: calc(100vh - 100px);
        }
        .project-card {
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .project-card:hover {
          box-shadow: 0 8px 32px rgba(60,0,120,0.12);
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
        {/* Header with Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 64px 0 64px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="Logo" style={{ height: 48, marginRight: 16 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <img src={SettingIcon} alt="Settings" style={{ width: 32, height: 32 }} />
            <img src={NotificationsIcon} alt="Notifications" style={{ width: 32, height: 32 }} />
          </div>
        </div>
        {/* Projects Title and Create Button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 64px 0 64px" }}>
          <h1 style={{ color: "#8F2FFF", fontWeight: 700, fontSize: 36 }}>Projects</h1>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: "#22143A", color: "#fff", fontWeight: 600, fontSize: 20, borderRadius: 8, padding: "12px 32px", border: "none", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(34,20,58,0.08)" }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, marginRight: 8 }}>+</span> Create New Project
          </button>
        </div>
        {/* Projects List */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, padding: "32px 64px" }}>
          {projects.map((project) => {
            let lastEdited = "Never";
            if (project.lastEdited) {
              const date = new Date(project.lastEdited);
              lastEdited = isNaN(date.getTime()) ? "Never" : date.toLocaleDateString();
            }
            return (
              <ProjectCard
                key={project._id}
                projectId={project._id}
                name={project.name}
                fileCount={project.fileCount}
                lastEdited={lastEdited}
                onDelete={() => handleDeleteProject(project._id)}
              />
            );
          })}
        </div>
        {showModal && <CreateProjectModal onClose={() => setShowModal(false)} onCreate={handleCreateProject} />}
      </div>
    </>
  );
};

export default ProjectsListPage;
