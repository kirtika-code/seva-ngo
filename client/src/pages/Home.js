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
  useTheme,
  CardActions,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BannerImg = "/images/joined-hands.png";

const features = [
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    title: 'Volunteer Programs',
    description: 'Join our diverse volunteer programs and make a direct impact in your community.',
    learnMore: '/volunteer',
    details: 'From teaching to environmental conservation, find the perfect opportunity to contribute your skills.'
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: 'Community Events',
    description: 'Participate in our regular community events and workshops.',
    learnMore: '/events',
    details: 'Join our workshops, seminars, and community gatherings to learn and connect.'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    title: 'Social Impact',
    description: 'Be part of meaningful projects that create lasting positive change.',
    learnMore: '/projects',
    details: 'Discover how our projects are making a difference in communities worldwide.'
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Education & Training',
    description: 'Access our educational resources and professional development programs.',
    learnMore: '/education',
    details: 'Enhance your skills with our comprehensive training programs and resources.'
  },
];

const impactStories = [
  {
    title: 'Community Garden Initiative',
    description: 'Transforming vacant lots into thriving community gardens, providing fresh produce and green spaces.',
    image: '/images/community-garden.png',
    learnMore: '/projects/garden',
    impact: '500+ families benefited, 20 gardens created',
    details: 'Our community gardens provide fresh produce, create green spaces, and bring communities together. Learn how you can get involved in this sustainable initiative.'
  },
  {
    title: 'Youth Education Program',
    description: 'Empowering young minds through after-school programs and mentorship.',
    image: '/images/NGO3.jpg',
    learnMore: '/projects/youth',
    impact: '1000+ students supported, 50+ mentors involved',
    details: 'Through our youth programs, we provide academic support, life skills training, and mentorship opportunities. Discover how you can make a difference in a young person\'s life.'
  },
  {
    title: 'Disaster Relief Efforts',
    description: 'Providing immediate assistance and long-term support to communities affected by natural disasters.',
    image: '/images/NGO2.jpg',
    learnMore: '/projects/relief',
    impact: '10+ communities helped, 5000+ people supported',
    details: 'Our disaster relief program provides immediate aid and long-term recovery support. Learn about our response efforts and how you can help communities in need.'
  },
];

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Seva Circle
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  Making a difference together
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Get Involved
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'white',
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  src={BannerImg}
                  alt="Community Impact"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                    maxHeight: { xs: '300px', md: '400px' },
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ 
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          How We Make an Impact
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.details}
                </Typography>
                <CardActions>
                  <Button
                    component={RouterLink}
                    to={feature.learnMore}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ mt: 'auto' }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Impact Stories Section */}
      <Box sx={{ bgcolor: 'grey.100', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Our Impact Stories
          </Typography>
          <Grid container spacing={4}>
            {impactStories.map((story, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={story.image}
                    alt={story.title}
                    sx={{
                      height: { xs: '200px', md: '250px' },
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {story.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {story.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                      Impact: {story.impact}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {story.details}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={story.learnMore}
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      fullWidth
                      sx={{
                        py: 1,
                        '&:hover': {
                          transform: 'translateX(5px)',
                          transition: 'transform 0.2s'
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Join our community of changemakers and start making an impact today.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Get Started
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 