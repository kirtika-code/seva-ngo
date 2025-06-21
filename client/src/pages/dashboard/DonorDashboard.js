import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const DonorDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Donor Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Welcome to your Donor Dashboard</Typography>
            <Typography>This is where you can manage your donations and track their impact.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DonorDashboard; 