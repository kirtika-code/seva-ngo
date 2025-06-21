import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const VolunteerDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Welcome to your Volunteer Dashboard</Typography>
            <Typography>This is where you can manage your volunteer activities.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerDashboard; 