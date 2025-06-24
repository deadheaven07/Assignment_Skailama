import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RSSIcon from '../images/RSS.svg';
import YoutubeIcon from '../images/Youtube.svg';
import UploadIcon from '../images/Upload.svg';
import NotificationsIcon from '../images/notificationsIcon.png';

const ExitIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="#F43F5E"/>
    <path d="M10 14H18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 11L18 14L15 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * UploadPage Component
 * Allows users to upload podcast sources (YouTube/RSS/MP3) for a specific project.
 */
function UploadPage({ user }) {
  const { projectId } = useParams();
  const [uploads, setUploads] = useState([]);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTranscript, setYoutubeTranscript] = useState('');
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('');

  /**
   * Fetch all uploads for this project
   */
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await api.get(`/uploads/${projectId}`);
        setUploads(res.data);
      } catch (err) {
        console.error('Failed to fetch uploads:', err.message);
      }
    };

    fetchUploads();
  }, [projectId]);

  /**
   * Upload a YouTube source to this project
   */
  const handleYoutubeUpload = async () => {
    if (!youtubeUrl.trim()) return;

    try {
      await api.post(`/uploads/${projectId}`, {
        type: 'youtube',
        source: youtubeUrl,
        transcript: youtubeTranscript,
      });
      setYoutubeUrl('');
      setYoutubeTranscript('');
      setShowYoutubeModal(false);
      
      // Refetch updated upload list
      const updated = await api.get(`/uploads/${projectId}`);
      setUploads(updated.data);
    } catch (err) {
      console.error('Upload failed:', err.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Placeholder for file upload logic
  const handleFileUpload = async () => {
    if (!file) return;
    // Implement file upload logic here
    alert('File upload not implemented in this demo.');
  };

  // Figma card style for upload options
  const uploadOptions = [
    {
      key: 'rss',
      icon: RSSIcon,
      title: 'RSS Feed',
      desc: 'Lorem ipsum dolor sit. Dolor lorem sit.',
      onClick: () => setUploadType('rss'),
    },
    {
      key: 'youtube',
      icon: YoutubeIcon,
      title: 'Youtube Video',
      desc: 'Lorem ipsum dolor sit. Dolor lorem sit.',
      onClick: () => setShowYoutubeModal(true),
    },
    {
      key: 'file',
      icon: UploadIcon,
      title: 'Upload Files',
      desc: 'Lorem ipsum dolor sit. Dolor lorem sit.',
      onClick: () => setUploadType('file'),
    },
  ];

  return (
    <div style={{ display: 'flex', background: '#fafbfc', minHeight: '100vh' }}>
      <Sidebar user={user} />
      <div style={{ marginLeft: 260, width: '100%', minHeight: '100vh', background: '#fafbfc' }}>
        {/* Top bar with notifications and exit icons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 48, marginBottom: 18, padding: '0 3rem' }}>
          <button style={{ background: 'none', border: 'none', marginRight: 18, cursor: 'pointer', padding: 0 }} title="Notifications">
            <img src={NotificationsIcon} alt="Notifications" style={{ width: 28, height: 28, filter: 'drop-shadow(0 2px 8px rgba(60,0,120,0.08))' }} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="Exit">
            <ExitIcon />
          </button>
        </div>
        {/* Main content column, centered */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 3rem', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ fontSize: 15, color: '#888', marginBottom: 10 }}>
            <span style={{ color: '#bbb' }}>Home Page / Sample Project / </span>
            <span style={{ color: '#8F2FFF', fontWeight: 600 }}>Add your podcast</span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 28, color: '#222' }}>Add Podcast</h2>
          <div style={{ display: 'flex', gap: 24, marginBottom: 36, justifyContent: 'stretch' }}>
            {uploadOptions.map(opt => (
              <div
                key={opt.key}
                onClick={opt.onClick}
                style={{
                  flex: 1,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(60,0,120,0.08)',
                  padding: '1.5rem 1.5rem 1.2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  border: uploadType === opt.key ? '2px solid #8F2FFF' : '1.5px solid #eee',
                  transition: 'box-shadow 0.2s, border 0.2s',
                  minWidth: 180,
                  maxWidth: 260,
                  minHeight: 120,
                  position: 'relative',
                  outline: 'none',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(143,47,255,0.10)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(60,0,120,0.08)'}
              >
                <img src={opt.icon} alt={opt.title} style={{ width: 38, height: 38, marginBottom: 12 }} />
                <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 4 }}>{opt.title}</div>
                <div style={{ color: '#888', fontSize: 15 }}>{opt.desc}</div>
              </div>
            ))}
          </div>
          {/* File Drop/Select Area - Figma style */}
          {uploadType === 'file' && (
            <div style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 4px 24px rgba(60,0,120,0.08)',
              padding: '3rem 2rem',
              textAlign: 'center',
              marginBottom: '2rem',
              border: '1.5px solid #eee',
              maxWidth: 800,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 18
            }}>
              <img src={UploadIcon} alt="Cloud Upload" style={{ width: 60, height: 60, marginBottom: 18, color: '#8F2FFF' }} />
              <div style={{ fontSize: 20, color: '#222', fontWeight: 500, marginBottom: 8 }}>
                Select a file or drag and drop here (Podcast Media or Transcription Text)
              </div>
              <div style={{ color: '#bbb', fontSize: 15, marginBottom: 18 }}>
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
              </div>
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload-input" />
              <label htmlFor="file-upload-input">
                <div style={{
                  display: 'inline-block',
                  padding: '0.8rem 2.5rem',
                  border: '2px solid #8F2FFF',
                  borderRadius: 30,
                  color: '#8F2FFF',
                  fontWeight: 600,
                  fontSize: 18,
                  background: '#fff',
                  cursor: 'pointer',
                  marginBottom: 0,
                  transition: 'background 0.2s, color 0.2s',
                }}>
                  Select File
                </div>
              </label>
              {file && <div style={{ marginTop: 12, color: '#8F2FFF', fontWeight: 500 }}>{file.name}</div>}
              <button onClick={handleFileUpload} style={{ display: 'none' }}>Upload</button>
            </div>
          )}
          {/* Uploaded List - Figma style */}
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(60,0,120,0.08)',
            padding: '2.5rem 2rem',
            margin: '0 0 0 0',
            width: '100%',
            alignSelf: 'stretch',
            overflowX: 'auto',
          }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 18, color: '#222' }}>Your Files</h3>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 700 }}>
              <thead>
                <tr style={{ background: '#f8f8fa' }}>
                  <th style={{ padding: '0.9rem', fontWeight: 600, color: '#888', fontSize: 16, textAlign: 'left', borderTopLeftRadius: 8 }}>No.</th>
                  <th style={{ padding: '0.9rem', fontWeight: 600, color: '#888', fontSize: 16, textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.9rem', fontWeight: 600, color: '#888', fontSize: 16, textAlign: 'left' }}>Upload Date & Time</th>
                  <th style={{ padding: '0.9rem', fontWeight: 600, color: '#888', fontSize: 16, textAlign: 'left', borderTopRightRadius: 8 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {uploads.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: '#bbb', padding: '2rem' }}>No files uploaded yet.</td></tr>
                ) : (
                  uploads.map((u, idx) => (
                    <tr key={u._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '0.8rem', color: '#8F2FFF', fontWeight: 600 }}>{idx + 1}</td>
                      <td style={{ padding: '0.8rem', color: '#222', fontWeight: 500 }}>{u.source}</td>
                      <td style={{ padding: '0.8rem', color: '#888', fontWeight: 500 }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleString('en-GB', {
                          day: '2-digit', month: 'short', year: '2-digit',
                          hour: '2-digit', minute: '2-digit', hour12: false
                        }).replace(',', ' |') : '--'}
                      </td>
                      <td style={{ padding: '0.8rem' }}>
                        <Link to={`/projects/${projectId}/upload/${u._id}/edit`} style={{ color: '#fff', background: '#8F2FFF', fontWeight: 600, textDecoration: 'none', borderRadius: 6, padding: '6px 18px', marginRight: 10, fontSize: 15, boxShadow: '0 1px 4px rgba(143,47,255,0.08)' }}>View</Link>
                        <button style={{ color: '#e11d48', background: '#fff', border: '1.5px solid #e11d48', borderRadius: 6, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(225,29,72,0.08)' }}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* YouTube Upload Modal */}
          {showYoutubeModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: 12, minWidth: 320 }}>
                <h3>Upload from YouTube</h3>
                <input
                  type="text"
                  placeholder="YouTube Link"
                  value={youtubeUrl}
                  onChange={e => setYoutubeUrl(e.target.value)}
                  style={{ width: '100%', marginBottom: 12, padding: 8 }}
                />
                <textarea
                  placeholder="Transcript (optional)"
                  value={youtubeTranscript}
                  onChange={e => setYoutubeTranscript(e.target.value)}
                  style={{ width: '100%', marginBottom: 12, padding: 8 }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <button onClick={() => setShowYoutubeModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: 6, background: '#eee', border: 'none' }}>Cancel</button>
                  <button onClick={handleYoutubeUpload} style={{ padding: '0.5rem 1rem', borderRadius: 6, background: '#7c3aed', color: '#fff', border: 'none' }}>Upload</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
