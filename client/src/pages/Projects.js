import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 'garden',
    title: 'Community Garden Initiative',
    description: 'Transforming vacant lots into thriving community gardens, providing fresh produce and green spaces.',
    image: '/images/community-garden.png',
    impact: '500+ families benefited, 20 gardens created',
    objectives: [
      'Create sustainable community gardens in urban areas',
      'Provide fresh produce to local communities',
      'Promote environmental awareness and education',
      'Build stronger community bonds through shared gardening activities'
    ],
    activities: [
      'Garden planning and design workshops',
      'Regular community gardening sessions',
      'Harvest festivals and food sharing events',
      'Environmental education programs'
    ],
    locations: ['Urban neighborhoods', 'School grounds', 'Community centers'],
    duration: 'Ongoing',
    participants: 'Local residents, schools, community groups'
  },
  {
    id: 'youth',
    title: 'Youth Education Program',
    description: 'Empowering young minds through after-school programs and mentorship.',
    image: '/images/youth-workshop.jpg',
    impact: '1000+ students supported, 50+ mentors involved',
    objectives: [
      'Improve academic performance and study skills',
      'Develop life skills and leadership abilities',
      'Provide career guidance and mentorship',
      'Create a supportive learning environment'
    ],
    activities: [
      'Homework assistance and tutoring',
      'Life skills workshops',
      'Career exploration sessions',
      'Mentorship programs'
    ],
    locations: ['Schools', 'Community centers', 'Online platforms'],
    duration: 'Academic year',
    participants: 'Students, teachers, mentors, volunteers'
  },
  {
    id: 'relief',
    title: 'Disaster Relief Efforts',
    description: 'Providing immediate assistance and long-term support to communities affected by natural disasters.',
    image: '/images/disaster.png',
    impact: '10+ communities helped, 5000+ people supported',
    objectives: [
      'Provide immediate emergency assistance',
      'Support long-term recovery efforts',
      'Build community resilience',
      'Coordinate relief efforts with local authorities'
    ],
    activities: [
      'Emergency shelter and food distribution',
      'Medical assistance and supplies',
      'Psychological support services',
      'Rebuilding and reconstruction support'
    ],
    locations: ['Disaster-affected areas', 'Emergency shelters', 'Recovery centers'],
    duration: 'As needed',
    participants: 'Relief workers, medical professionals, volunteers'
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            mb: 6,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Our Projects
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Making a difference in communities through impactful initiatives
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Get Involved
          </Button>
        </Paper>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                    Impact: {project.impact}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleOpenDialog(project)}
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Project Details Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          }}
        >
          {selectedProject && (
            <>
              <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h5" component="div">
                  {selectedProject.title}
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ mb: 3 }}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Impact: {selectedProject.impact}
                </Typography>
                <Typography paragraph>
                  {selectedProject.description}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Objectives
                    </Typography>
                    <List>
                      {selectedProject.objectives.map((objective, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={objective} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Activities
                    </Typography>
                    <List>
                      {selectedProject.activities.map((activity, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={activity} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">Locations</Typography>
                      </Box>
                      <Typography variant="body2">
                        {selectedProject.locations.join(', ')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">Duration</Typography>
                      </Box>
                      <Typography variant="body2">
                        {selectedProject.duration}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PeopleIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">Participants</Typography>
                      </Box>
                      <Typography variant="body2">
                        {selectedProject.participants}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  sx={{ mr: 1 }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleCloseDialog();
                    navigate('/register');
                  }}
                >
                  Get Involved
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Projects; 