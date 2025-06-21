import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const VolunteerManagement = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Volunteer Management Dashboard</Typography>
            <Typography>Manage volunteers, their skills, and assignments here.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerManagement; 