import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  Logout,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  Folder as FolderIcon,
  Event as EventIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  Work as WorkIcon,
  Favorite as FavoriteIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const Header = ({ mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
    onDrawerToggle();
  };

  const handleRegister = () => {
    handleClose();
    navigate('/register');
    onDrawerToggle();
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
    onDrawerToggle();
  };

  const handleDashboard = () => {
    handleClose();
    if (user?.role === 'admin') {
      navigate('/admin');
    } else if (user?.role === 'volunteer') {
      navigate('/volunteer');
    } else {
      navigate('/donor');
    }
    onDrawerToggle();
  };

  // Public navigation items for all users
  const publicMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Blogs', icon: <ArticleIcon />, path: '/blogs' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
    { text: 'Careers', icon: <WorkIcon />, path: '/careers' },
    { text: 'Donate', icon: <FavoriteIcon />, path: '/donate' },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Donations', icon: <MoneyIcon />, path: '/admin/donations' },
    { text: 'Projects', icon: <EventIcon />, path: '/admin/projects' },
    { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
    { text: 'Volunteers', icon: <GroupIcon />, path: '/admin/volunteers' },
  ];

  // Determine which navigation items to show in desktop header
  const desktopNavItems = isAuthenticated ? (user?.role === 'admin' ? [...publicMenuItems, ...adminMenuItems] : publicMenuItems) : publicMenuItems;

  // Drawer content
  const drawer = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {publicMenuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                onDrawerToggle();
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : theme.palette.text.primary }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: location.pathname === item.path ? 'primary.main' : theme.palette.text.primary }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isAuthenticated && user?.role === 'admin' && (
        <>
          <Divider />
          <List>
            {adminMenuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    onDrawerToggle();
                  }}
                  selected={location.pathname.startsWith(item.path)}
                >
                  <ListItemIcon sx={{ color: location.pathname.startsWith(item.path) ? 'primary.main' : theme.palette.text.primary }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: location.pathname.startsWith(item.path) ? 'primary.main' : theme.palette.text.primary }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Divider />
      {isAuthenticated ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'error.main' }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}><AccountCircle /></ListItemIcon>
              <ListItemText primary="Login" sx={{ color: theme.palette.text.primary }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleRegister}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}><AccountCircle /></ListItemIcon>
              <ListItemText primary="Register" sx={{ color: theme.palette.text.primary }} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onDrawerToggle}
              sx={{ mr: 2, color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              flexGrow: 1,
              color: 'primary.main',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
            onClick={() => navigate('/')}
          >
            Seva Circle
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {publicMenuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    minWidth: 'auto',
                    padding: '6px 12px',
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                    display: 'block',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Typography
                    sx={{
                      color: 'text.primary',
                      display: 'block',
                      fontSize: 'inherit'
                    }}
                  >
                    {item.text}
                  </Typography>
                </Button>
              ))}

              {/* Admin Desktop Navigation */}
              {isAuthenticated && user?.role === 'admin' && (
                adminMenuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                      minWidth: 'auto',
                      padding: '6px 12px',
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                      display: 'block',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'text.primary',
                        display: 'block',
                        fontSize: 'inherit',
                        // Add underline on hover or active
                        textDecoration: 'none',
                        position: 'relative',
                        '&::after': {
                          content: '' || null,
                          position: 'absolute',
                          left: 0,
                          bottom: -2,
                          width: '0',
                          height: '2px',
                          backgroundColor: theme.palette.primary.main,
                          transition: 'width 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Button>
                ))
              )}

              {/* User Avatar/Menu */}
              {isAuthenticated ? (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
              ) : (
                <Box>
                  <Button color="inherit" onClick={handleLogin} sx={{ color: 'text.primary' }}>Login</Button>
                  <Button color="inherit" onClick={handleRegister} sx={{ color: 'text.primary' }}>Register</Button>
                </Box>
              )}

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDashboard}>
                  <ListItemIcon><Dashboard fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Header; 