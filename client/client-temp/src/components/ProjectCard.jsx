import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// You can use a simple SVG for the trash icon
const TrashIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8V15M10 8V15M14 8V15M3 5H17M8 5V3H12V5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="4" y="5" width="12" height="12" rx="2" stroke="#888" strokeWidth="1.5"/>
  </svg>
);

const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const ProjectCard = ({ projectId, name, fileCount, lastEdited, onDelete }) => {
  const navigate = useNavigate();
  const initials = getInitials(name);
  const [hovered, setHovered] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  return (
    <div
      onClick={() => navigate(`/projects/${projectId}/upload`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: hovered ? '0 8px 32px rgba(143,47,255,0.18)' : '0 2px 8px rgba(60,0,120,0.08)',
        transform: hovered ? 'translateY(-2px) scale(1.025)' : 'none',
        transition: 'box-shadow 0.2s, transform 0.2s',
        display: 'flex',
        alignItems: 'center',
        minWidth: 320,
        maxWidth: 400,
        padding: '20px 28px',
        gap: 20,
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        marginBottom: 16,
        position: 'relative'
      }}
    >
      {/* Initials box */}
      <div
        style={{
          width: 64,
          height: 64,
          background: '#FDB022',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 32,
          color: '#fff',
        }}
      >
        {initials}
      </div>
      {/* Project info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            color: nameHovered ? '#6C1BCF' : '#8F2FFF',
            fontSize: 18,
            marginBottom: 2,
            textDecoration: nameHovered ? 'underline' : 'none',
            transition: 'color 0.2s, text-decoration 0.2s',
            cursor: 'pointer',
            width: 'fit-content',
            display: 'inline-block',
          }}
          onMouseEnter={e => { e.stopPropagation(); setNameHovered(true); }}
          onMouseLeave={e => { e.stopPropagation(); setNameHovered(false); }}
        >
          {name}
        </div>
        <div style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>{fileCount} {fileCount === 1 ? 'File' : 'Files'}</div>
        <div style={{ color: '#aaa', fontSize: 13 }}>Last edited {lastEdited}</div>
      </div>
      {/* Delete button */}
      <button
        onClick={e => { e.stopPropagation(); onDelete && onDelete(); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          top: 16,
          right: 16,
          padding: 4
        }}
        title="Delete Project"
      >
        <TrashIcon size={20} />
      </button>
    </div>
  );
};

export default ProjectCard; 