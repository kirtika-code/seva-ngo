import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const DonorDonations = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Donations
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Donation History</Typography>
            <Typography>View your donation history and receipts here.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DonorDonations; 