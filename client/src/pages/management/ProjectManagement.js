import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const ProjectManagement = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Project Management Dashboard</Typography>
            <Typography>This is where you can manage NGO projects.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectManagement; 