import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import NotificationsIcon from '../images/notificationsIcon.png';

const ExitIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="#F43F5E"/>
    <path d="M10 14H18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 11L18 14L15 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * EditTranscriptPage Component
 * Displays and allows editing the transcript of a specific upload
 */
function EditTranscriptPage() {
  const { projectId, uploadId } = useParams();
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [speaker, setSpeaker] = useState('Speaker');
  const [user, setUser] = useState(null);
  const [originalTranscript, setOriginalTranscript] = useState('');

  useEffect(() => {
    // Optionally fetch user for Sidebar
    api.get('/auth/me').then(res => setUser(res.data.user)).catch(() => {});
  }, []);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const res = await api.get(`/uploads/${projectId}`);
        const upload = res.data.find((u) => u._id === uploadId);
        setTranscript(upload?.transcript || '');
        setOriginalTranscript(upload?.transcript || '');
      } catch (err) {
        console.error('Failed to load transcript');
      } finally {
        setLoading(false);
      }
    };
    fetchTranscript();
  }, [projectId, uploadId]);

  const handleSave = async () => {
    try {
      await api.put(`/uploads/${uploadId}/transcript`, { transcript });
      setOriginalTranscript(transcript);
      setEditing(false);
    } catch {
      alert('Error saving transcript');
    }
  };

  const handleDiscard = () => {
    setTranscript(originalTranscript);
    setEditing(false);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {}
    window.location.reload(); // fallback to reload to show login popup
  };

  if (loading) return <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif', color: '#888' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', background: '#fafbfc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar user={user} />
      <div style={{ marginLeft: 260, width: '100%', minHeight: '100vh', background: 'none', display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 3rem', width: '100%' }}>
          {/* Top right icons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 48, marginBottom: 18 }}>
            <button style={{ background: 'none', border: 'none', marginRight: 18, cursor: 'pointer', padding: 0 }} title="Notifications">
              <img src={NotificationsIcon} alt="Notifications" style={{ width: 28, height: 28, filter: 'drop-shadow(0 2px 8px rgba(60,0,120,0.08))' }} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="Exit" onClick={handleLogout}>
              <ExitIcon />
            </button>
          </div>
          {/* Breadcrumb */}
          <div style={{ fontSize: 15, color: '#888', marginTop: 32, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to={`/projects/${projectId}/upload`} style={{ color: '#222', textDecoration: 'none', marginRight: 10, display: 'flex', alignItems: 'center', borderRadius: 6, padding: '2px 8px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background='#f3e8ff'} onMouseOut={e => e.currentTarget.style.background='none'}>
              <span style={{ fontSize: 22, marginRight: 4, display: 'inline-block', transform: 'translateY(2px)' }}>&larr;</span>
            </Link>
            <span style={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 17, marginRight: 2, display: 'inline-block', transform: 'translateY(2px)' }}>🏠</span> Home Page
            </span>
            <span style={{ color: '#bbb' }}>/ Sample Project</span>
            <span style={{ color: '#8F2FFF', fontWeight: 600 }}>/ Add your podcast</span>
          </div>
          {/* Title and Edit/Save/Discard Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, marginTop: 8 }}>
            <h2 style={{ fontWeight: 800, fontSize: 32, color: '#222', margin: 0, letterSpacing: 0.2 }}>Edit Transcript</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              {!editing && (
                <button onClick={() => setEditing(true)} style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 36px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 1px 4px #ececec', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background='#8F2FFF'} onMouseOut={e => e.currentTarget.style.background='#222'}>Edit</button>
              )}
              {editing && (
                <>
                  <button onClick={handleDiscard} style={{ background: '#fff', color: '#e11d48', border: '1.5px solid #e11d48', borderRadius: 8, padding: '10px 28px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 1px 4px #ececec', transition: 'background 0.2s, color 0.2s' }}>Discard</button>
                  <button onClick={handleSave} style={{ background: '#8F2FFF', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 36px', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px #e9d5ff', transition: 'background 0.2s' }}>Save</button>
                </>
              )}
            </div>
          </div>
          {/* Centered Card */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '60vh' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(60,0,120,0.08)', border: '1.5px solid #ececec', padding: '2.2rem 2.2rem 2rem 2.2rem', maxWidth: 600, width: '100%', minHeight: 180, margin: '0 auto', transition: 'box-shadow 0.2s, border 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: '#8F2FFF', fontWeight: 700, fontSize: 18, marginBottom: 16, letterSpacing: 0.5 }}>Speaker</div>
              {editing ? (
                <textarea
                  style={{ width: '100%', minHeight: 160, fontSize: 16, borderRadius: 8, border: '1.5px solid #eee', padding: 16, marginBottom: 0, resize: 'vertical', fontFamily: 'inherit', background: '#fafbfc', color: '#222', boxShadow: '0 1px 4px #ececec' }}
                  value={transcript}
                  onChange={e => setTranscript(e.target.value)}
                  placeholder="Type transcript here..."
                />
              ) : (
                <div style={{ color: transcript ? '#222' : '#bbb', fontSize: 16, lineHeight: 1.7, whiteSpace: 'pre-line', minHeight: 120, width: '100%', fontWeight: 500, fontStyle: transcript ? 'normal' : 'italic', padding: 0 }}>
                  {transcript ? transcript : 'No transcript available. Click Edit to add one.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTranscriptPage;
