import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const VolunteerEvents = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Events
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Event Management</Typography>
            <Typography>View and manage your registered events here.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerEvents; 