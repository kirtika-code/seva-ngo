import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import theme from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Donations from './pages/Donations';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import VolunteerDashboard from './pages/dashboard/VolunteerDashboard';
import DonorDashboard from './pages/dashboard/DonorDashboard';
import DonationManagement from './pages/management/DonationManagement';
import ProjectManagement from './pages/management/ProjectManagement';
import EventManagement from './pages/management/EventManagement';
import VolunteerManagement from './pages/management/VolunteerManagement';
import DonationHistory from './pages/DonationHistory';
import ProjectDetails from './pages/ProjectDetails';
import Education from './pages/Education';
import Blogs from './pages/Blogs';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) {
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'volunteer') return <Navigate to="/volunteer" />;
    if (user.role === 'donor') return <Navigate to="/donor" />;
    return <Navigate to="/" />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="careers" element={<Careers />} />
      <Route path="projects" element={<Projects />} />
      <Route path="events" element={<Events />} />
      <Route path="donate" element={<Donations />} />
      <Route path="education" element={<Education />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
    </Route>

    {/* Protected Routes */}
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Layout>
             <Profile />
          </Layout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/*"
      element={
        <ProtectedRoute roles={['admin']}>
          <Layout>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="donations" element={<DonationManagement />} />
              <Route path="projects" element={<ProjectManagement />} />
              <Route path="events" element={<EventManagement />} />
              <Route path="volunteers" element={<VolunteerManagement />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/volunteer/*"
      element={
        <ProtectedRoute roles={['volunteer']}>
          <Layout>
            <VolunteerDashboard />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/donor/*"
      element={
        <ProtectedRoute roles={['donor']}>
          <Layout>
            <DonorDashboard />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/donation-history"
      element={
        <ProtectedRoute>
          <Layout>
            <DonationHistory />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route path="/projects/:projectId" element={<ProjectDetails />} />
  </Routes>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 