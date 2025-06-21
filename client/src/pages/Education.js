import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  School as SchoolIcon,
  Book as BookIcon,
  Computer as ComputerIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const programs = [
  {
    title: 'Digital Literacy Program',
    description: 'Empowering individuals with essential digital skills for the modern world.',
    image: 'https://source.unsplash.com/random/400x300?digital',
    features: [
      'Basic computer operations',
      'Internet safety and security',
      'Digital communication tools',
      'Online learning platforms'
    ],
    duration: '8 weeks',
    level: 'Beginner to Intermediate'
  },
  {
    title: 'Professional Development',
    description: 'Enhancing career prospects through specialized training and certification.',
    image: 'https://source.unsplash.com/random/400x300?professional',
    features: [
      'Resume building workshops',
      'Interview preparation',
      'Leadership skills',
      'Industry-specific training'
    ],
    duration: '12 weeks',
    level: 'Intermediate to Advanced'
  },
  {
    title: 'Youth Empowerment',
    description: 'Building confidence and skills in young people through interactive learning.',
    image: 'https://source.unsplash.com/random/400x300?youth',
    features: [
      'Life skills development',
      'Career exploration',
      'Team building activities',
      'Personal growth workshops'
    ],
    duration: '6 weeks',
    level: 'All levels'
  }
];

const resources = [
  {
    title: 'Online Learning Platform',
    description: 'Access our comprehensive library of courses and learning materials.',
    icon: <ComputerIcon sx={{ fontSize: 40 }} />,
    link: '/resources/online-learning'
  },
  {
    title: 'Study Groups',
    description: 'Join peer learning communities for collaborative study sessions.',
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    link: '/resources/study-groups'
  },
  {
    title: 'Educational Materials',
    description: 'Download free educational resources and study materials.',
    icon: <BookIcon sx={{ fontSize: 40 }} />,
    link: '/resources/materials'
  }
];

const Education = () => {
  const navigate = useNavigate();

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
          <SchoolIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Education & Training Programs
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Empowering communities through knowledge and skills development
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
            Enroll Now
          </Button>
        </Paper>

        {/* Programs Section */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Our Programs
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {programs.map((program, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                  image={program.image}
                  alt={program.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {program.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {program.description}
                  </Typography>
                  <List>
                    {program.features.map((feature, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {program.duration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Level: {program.level}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Resources Section */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Learning Resources
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {resource.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(resource.link)}
                >
                  Access Resource
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'grey.100',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Ready to Start Your Learning Journey?
          </Typography>
          <Typography variant="body1" paragraph>
            Join our community of learners and take the first step towards your goals.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Enroll Now
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Education; 