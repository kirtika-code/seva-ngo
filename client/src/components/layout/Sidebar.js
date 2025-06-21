import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  ExitToApp as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  Folder as FolderIcon,
  Work as WorkIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { donationAPI } from '../../services/api';

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user, logout } = useAuth();
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({
    donations: true,
    contact: true
  });

  // Public navigation items
  const authenticatedMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
    { text: 'Careers', icon: <WorkIcon />, path: '/careers' },
    { text: 'Donate', icon: <FavoriteIcon />, path: '/donate' },
    { text: 'Donation History', icon: <HistoryIcon />, path: '/donation-history' },
  ];

  useEffect(() => {
    const fetchRecentDonations = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const response = await donationAPI.getRecentDonations();
          setRecentDonations(response.data);
        } catch (error) {
          console.error('Error fetching recent donations:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setRecentDonations([]);
        setLoading(false);
      }
    };

    fetchRecentDonations();
  }, [isAuthenticated]);

  const handleExpandClick = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>
      {/* Profile Section */}
      {isAuthenticated && (
        <Box sx={{ p: 2, textAlign: 'center', mt: '64px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden', maxWidth: '100%' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto',
              bgcolor: 'primary.main',
              fontSize: '2rem'
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ mt: 2, color: 'primary.main', wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}>
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1, borderRadius: 20, wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}
            onClick={() => navigate('/profile')}
            startIcon={<SettingsIcon fontSize="small" />}
          >
            Edit Profile
          </Button>
        </Box>
      )}

      {/* Main Navigation Menu (shown when logged in) */}
      {isAuthenticated && (
        <List sx={{ overflowX: 'hidden', maxWidth: '100%' }}>
          <Divider />
          {authenticatedMenuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ overflowX: 'hidden', maxWidth: '100%' }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  // Close mobile drawer if open
                  if (isMobile) onDrawerToggle();
                }}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ flexShrink: 0, color: location.pathname === item.path ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Divider />

      {/* Contact Details Section */}
      {isAuthenticated && (
        <Box sx={{ p: 2, width: '100%', boxSizing: 'border-box', overflowX: 'hidden', maxWidth: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', wordBreak: 'break-word', overflowX: 'hidden', maxWidth: 'calc(100% - 40px)' }}>
              Contact Details
            </Typography>
            <IconButton onClick={() => handleExpandClick('contact')} size="small" sx={{ flexShrink: 0 }}>
              {expanded.contact ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.contact}>
            <List dense sx={{ overflowX: 'hidden', maxWidth: '100%' }}>
              <ListItem sx={{ wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}>
                <ListItemIcon sx={{ flexShrink: 0 }}>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={user?.email}
                  secondaryTypographyProps={{ variant: 'body2', noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}
                />
              </ListItem>
              <ListItem sx={{ wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}>
                <ListItemIcon sx={{ flexShrink: 0 }}>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Phone"
                  secondary={user?.phone || 'Not provided'}
                  secondaryTypographyProps={{ variant: 'body2', noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}
                />
              </ListItem>
              <ListItem sx={{ wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}>
                <ListItemIcon sx={{ flexShrink: 0 }}>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Address"
                  secondary={user?.address || 'Not provided'}
                  secondaryTypographyProps={{ variant: 'body2', noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}
                />
              </ListItem>
            </List>
          </Collapse>
        </Box>
      )}

      <Divider />

      {/* Donations Section */}
      {isAuthenticated && (
        <Box sx={{ p: 2, width: '100%', boxSizing: 'border-box', overflowX: 'hidden', maxWidth: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', wordBreak: 'break-word', overflowX: 'hidden', maxWidth: 'calc(100% - 40px)' }}>
              Recent Donations
            </Typography>
            <IconButton onClick={() => handleExpandClick('donations')} size="small" sx={{ flexShrink: 0 }}>
              {expanded.donations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.donations}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (recentDonations && recentDonations.length > 0 ? (
              recentDonations.map((donation) => (
                <Paper
                  key={donation.id}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    mb: 1,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflowX: 'hidden',
                    wordBreak: 'break-word',
                    maxWidth: '100%'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'primary.main', wordBreak: 'break-word', overflowX: 'hidden', maxWidth: '100%' }}>
                    ₹{donation.amount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {donation.donorName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {new Date(donation.createdAt).toLocaleDateString()} • {donation.city}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                No recent donations.
              </Typography>
            ))}
          </Collapse>
        </Box>
      )}

      {/* Logout Button */}
      {isAuthenticated && (
        <List sx={{ overflowX: 'hidden', maxWidth: '100%' }}>
          <Divider />
          <ListItem disablePadding sx={{ overflowX: 'hidden', maxWidth: '100%' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'error.lighter',
                },
              }}
            >
              <ListItemIcon sx={{ flexShrink: 0 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ color: 'error.main' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
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
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              marginTop: '64px',
              height: `calc(100% - 64px)`,
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar; 