import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const DonorProjects = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Supported Projects
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Project Impact</Typography>
            <Typography>View the projects you've supported and their impact.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DonorProjects; 