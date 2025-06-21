import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 280; // Use the same drawerWidth as in Sidebar.js
const sidebarGap = 30; // Desired gap between sidebar and main content

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      {/* Container for sidebar and main content */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          mt: '64px', // Margin top to clear the fixed header height
        }}
      >
        {/* Sidebar */}
        {isAuthenticated && (
          <Box
            component="aside"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: 0,
              display: { xs: 'none', md: 'block' }, // Hide on small screens, let Drawer handle it
              // Sidebar content is inside the Drawer in Sidebar.js
            }}
          >
            {/* The actual Sidebar Drawer component handles its own visibility and mobile behavior */}
            <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
          </Box>
        )}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Main content takes remaining horizontal space
            padding: '1.5rem', // Default padding
            paddingLeft: { sm: isAuthenticated ? `${sidebarGap}px` : '1.5rem' }, // Add specific left padding when sidebar is open
            width: { sm: isAuthenticated ? `calc(100% - ${drawerWidth}px)` : '100%' }, // Adjust width based on sidebar presence
            overflowY: 'auto', // Allow vertical scrolling in main content
            display: 'flex', // Use flexbox for centering content
            justifyContent: 'center', // Center content horizontally
            boxSizing: 'border-box', // Include padding in width
            flexDirection: 'column', // Allow content inside main to stack vertically
            alignItems: 'center', // Center items horizontally within the main content box
          }}
        >
          {children || <Outlet />}
          {/* Footer */}
          {/* Placed inside the main content box to scroll with it */}
          <Box sx={{ mt: 'auto', width: '100%' }}>{/* mt: auto pushes footer to bottom */}
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 