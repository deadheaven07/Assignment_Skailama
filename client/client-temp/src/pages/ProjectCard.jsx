import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/projects/${project._id}/upload`)}>
      <h3>{project.name}</h3>
    </div>
  );
};

export default ProjectCard;
