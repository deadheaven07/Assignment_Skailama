import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QuesLogo from '../images/QuesLogo 1.svg';

const navItems = [
  { label: 'Add your Podcast(s)', to: '/projects', icon: null },
  { label: 'Create & Repurpose', to: '#', icon: null },
  { label: 'Podcast Widget', to: '#', icon: null },
  { label: 'Upgrade', to: '#', icon: null },
];

const DoubleChevron = ({ rotated }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: rotated ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s',
      display: 'block',
      margin: 'auto',
    }}
  >
    <path d="M14.5 6L10.5 11L14.5 16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 6L6 11L10 16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sidebar = ({ user }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sidebarWidth = collapsed ? 70 : 260;
  return (
    <div style={{
      width: sidebarWidth,
      background: "#f8f8fa",
      minHeight: "100vh",
      padding: collapsed ? "2.5rem 0 1.5rem 0" : "2.5rem 0 1.5rem 0",
      borderRight: "1px solid #eee",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: collapsed ? 'center' : 'stretch',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      transition: 'width 0.2s',
    }}>
      {/* Arrow Button - aligned to sidebar edge, vertically centered */}
      <button
        style={{
          position: 'absolute',
          top: '50%',
          right: -18,
          transform: `translateY(-50%)`,
          background: hovered ? '#7a1fd1' : '#8F2FFF',
          border: 'none',
          borderRadius: '50%',
          width: 38,
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(60,0,120,0.08)',
          cursor: 'pointer',
          zIndex: 20,
          padding: 0,
          transition: 'background 0.2s',
        }}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        onClick={() => setCollapsed(c => !c)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <DoubleChevron rotated={collapsed} />
      </button>
      <div style={{ width: '100%' }}>
        {/* Logo/Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 0, marginLeft: collapsed ? 0 : 32, marginBottom: 36 }}>
          <img src={QuesLogo} alt="Ques.AI Logo" style={{ width: collapsed ? 38 : 140, height: 'auto', transition: 'width 0.2s' }} />
        </div>
        {/* Nav */}
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item, idx) => {
              const isActive = location.pathname.startsWith(item.to) && item.to !== '#';
              return (
                <li key={item.label} style={{ margin: collapsed ? "0.5rem 0" : "0.5rem 0" }}>
                  <Link
                    to={item.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      gap: 12,
                      textDecoration: 'none',
                      color: isActive ? '#8F2FFF' : '#222',
                      background: isActive ? '#F3E8FF' : 'transparent',
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: 10,
                      padding: collapsed ? '0.85rem 0.5rem' : '0.85rem 2.2rem',
                      marginLeft: isActive ? 0 : (collapsed ? 0 : 12),
                      borderLeft: isActive ? '5px solid #8F2FFF' : '5px solid transparent',
                      transition: 'background 0.2s, color 0.2s, padding 0.2s',
                      minWidth: collapsed ? 0 : 120,
                      width: collapsed ? 48 : 'auto',
                      justifyItems: 'center',
                    }}
                  >
                    {/* If you add icons, show here: {item.icon && <img src={item.icon} alt="" style={{ width: 20, height: 20 }} />} */}
                    {!collapsed && item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Divider after nav */}
        <div style={{ height: 1, background: '#ececec', margin: collapsed ? '1.5rem 0 1.5rem 0' : '1.5rem 0 1.5rem 32px', width: collapsed ? '60%' : '80%', alignSelf: collapsed ? 'center' : 'flex-start' }} />
      </div>
      {/* Help and user info at the bottom */}
      <div style={{ width: '100%' }}>
        {/* Help link at the bottom */}
        <div style={{ marginLeft: collapsed ? 0 : 32, marginBottom: 18, display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Link to="#" style={{ color: '#888', fontSize: 16, textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ marginRight: 8 }}>⚙️</span> {!collapsed && 'Help'}
          </Link>
        </div>
        {/* User info */}
        <Link to="/settings" style={{ textDecoration: 'none' }}>
          <div style={{ marginLeft: collapsed ? 0 : 24, marginBottom: 8, width: '100%', display: 'flex', flexDirection: 'column', alignItems: collapsed ? 'center' : 'flex-start', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, flexDirection: collapsed ? 'column' : 'row', width: '100%', justifyContent: collapsed ? 'center' : 'flex-start' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#7c3aed', fontSize: 18 }}>
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              {!collapsed && (
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>{user?.name || 'Username'}</div>
                  <div style={{ fontSize: 13, color: '#888' }}>{user?.email || 'username@gmail.com'}</div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
