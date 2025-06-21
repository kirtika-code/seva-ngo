import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  CircularProgress
} from '@mui/material';
import { donationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/common/Notification';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Fetching donations...');
      console.log('isAuthenticated:', isAuthenticated);
      console.log('Token in localStorage:', localStorage.getItem('token'));
      fetchDonations();
    } else {
      console.log('Not authenticated, not fetching donations.');
      setDonations([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await donationAPI.getMyDonations();
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch donation history:', error);
      if (isAuthenticated) {
        setNotification({
          open: true,
          message: error.response?.data?.message || 'Failed to fetch donation history',
          severity: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Donation History
          </Typography>
          
          {donations.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No donations found
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{donation.amount}</TableCell>
                      <TableCell>
                        {donation.paymentMethod.charAt(0).toUpperCase() + 
                         donation.paymentMethod.slice(1)}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={donation.status.charAt(0).toUpperCase() + 
                                donation.status.slice(1)}
                          color={getStatusColor(donation.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {donation.message || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      />
    </Container>
  );
};

export default DonationHistory; 