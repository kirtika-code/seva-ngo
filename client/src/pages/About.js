import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const mission = [
    {
      title: 'Our Mission',
      description: 'To create positive change in communities through sustainable development and social impact initiatives.',
    },
    {
      title: 'Our Vision',
      description: 'A world where every community has access to resources and opportunities for growth and development.',
    },
    {
      title: 'Our Values',
      description: 'Integrity, transparency, and commitment to making a lasting impact in the communities we serve.',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 'bold' }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Learn more about our organization and our commitment to making a difference
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {mission.map((item, index) => (
            <Grid item xs={12} md={4} key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" gutterBottom color="primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Our Impact
            </Typography>
            <Typography variant="body1" paragraph align="center" color="text.secondary">
              Through our various initiatives and programs, we have made significant progress in:
            </Typography>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              { number: '1000+', text: 'Communities Served' },
              { number: '5000+', text: 'Volunteers Engaged' },
              { number: '100+', text: 'Projects Completed' },
              { number: '50+', text: 'Partner Organizations' },
            ].map((item, index) => (
              <Grid item xs={6} md={3} key={item.text}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      height: '100%',
                    }}
                  >
                    <Typography variant="h3" color="primary" gutterBottom>
                      {item.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.text}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About; 