
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Services } from './pages/Services.jsx';
import { Projects } from './pages/Projects.jsx';
import { Blogs } from './pages/Blogs.jsx';
import { Contact } from './pages/Contact.jsx';
import { AdminLogin } from './pages/Admin/Login.jsx';
import { AdminDashboard } from './pages/Admin/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
