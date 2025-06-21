import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const VolunteerTasks = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Task Management</Typography>
            <Typography>View and manage your assigned tasks here.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerTasks; 