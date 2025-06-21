import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const projectDetails = {
  garden: {
    title: 'Community Garden Initiative',
    image: '/images/community-garden.png',
    description: 'Our Community Garden Initiative transforms vacant lots into thriving green spaces that provide fresh produce and bring communities together.',
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
  youth: {
    title: 'Youth Education Program',
    image: '/images/community-garden.png',
    description: 'Our Youth Education Program empowers young minds through comprehensive after-school programs and mentorship opportunities.',
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
  relief: {
    title: 'Disaster Relief Efforts',
    image: 'https://source.unsplash.com/random/800x400?relief',
    description: 'Our Disaster Relief Program provides immediate assistance and long-term support to communities affected by natural disasters.',
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
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectDetails[projectId];

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Project not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4 }}
        >
          Back to Projects
        </Button>

        <Paper elevation={3} sx={{ mb: 6, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="400"
            image={project.image}
            alt={project.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Impact: {project.impact}
            </Typography>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
          </CardContent>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Project Objectives
                </Typography>
                <List>
                  {project.objectives.map((objective, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={objective} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Key Activities
                </Typography>
                <List>
                  {project.activities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={activity} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Locations</Typography>
                    </Box>
                    <Typography variant="body1">
                      {project.locations.join(', ')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Duration</Typography>
                    </Box>
                    <Typography variant="body1">
                      {project.duration}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PeopleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Participants</Typography>
                    </Box>
                    <Typography variant="body1">
                      {project.participants}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Get Involved
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectDetails; 