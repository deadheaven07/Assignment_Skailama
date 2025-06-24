import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import api from "./api/axios";
import WelcomePage from "./pages/WelcomePage";
import ProjectsListPage from "./pages/ProjectsListPage";
import UploadPage from "./pages/UploadPage";
import EditTranscriptPage from "./pages/EditTranscriptPage";
import SettingsPage from "./pages/SettingsPage";

/**
 * App Component
 * - Handles user authentication
 * - Manages routing across project and upload pages
 * - Displays login popup when unauthenticated
 */
function App() {
  const [user, setUser] = useState(null); // Logged-in user state

  /**
   * Checks current authentication by hitting /auth/me
   */
  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.warn("User not authenticated");
      setUser(null);
    }
  };

  // Run once on component mount to verify auth
  useEffect(() => {
    checkAuth();
  }, []);

  // Show login popup if not authenticated
  if (!user) return <WelcomePage onLogin={setUser} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route
          path="/projects/:projectId/upload"
          element={<UploadPage user={user} />}
        />
        <Route
          path="/projects/:projectId/upload/:uploadId/edit"
          element={<EditTranscriptPage />}
        />
        <Route
          path="/settings"
          element={<SettingsPage setUser={setUser} user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
