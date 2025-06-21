import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { donationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/common/Notification';

const Donate = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    donationType: 'monetary',
    amount: '',
    paymentMethod: 'card',
    itemType: '',
    quantity: '',
    itemDescription: '',
    donorName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // New state for stepper
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setNotification({
        open: true,
        message: 'Please login to make a donation',
        severity: 'warning'
      });
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        donorName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  // QR code timer effect
  useEffect(() => {
    let timer;
    if (showQR) {
      timer = setTimeout(() => {
        setShowPaymentHistory(true);
      }, 30000); // 30 seconds
    } else {
      setShowPaymentHistory(false);
    }
    return () => clearTimeout(timer);
  }, [showQR]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validation based on donation type
    if (formData.donationType === 'monetary') {
      if (!formData.amount) {
        newErrors.amount = 'Amount is required';
      } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
        newErrors.amount = 'Please enter a valid amount';
      }
      // paymentMethod is required for monetary, but has default
    } else if (formData.donationType === 'item') {
      if (!formData.itemType.trim()) {
        newErrors.itemType = 'Item type is required';
      }
      if (!formData.quantity) {
         newErrors.quantity = 'Quantity is required';
      } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
         newErrors.quantity = 'Please enter a valid quantity';
      }
      // itemDescription is optional
    }

    // Common fields validation
    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone is now optional in model, but let's keep required for frontend form
    if (!formData.phone) {
       newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
       newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear type-specific errors when switching donation type
    if (name === 'donationType') {
       setErrors({});
       setFormData(prev => ({
         ...prev,
         amount: '',
         paymentMethod: 'card',
         itemType: '',
         quantity: '',
         itemDescription: ''
       }));
    }
    // Show QR if payment method is qrcode
    if (name === 'paymentMethod') {
      if (value === 'qrcode') {
        setShowQR(true);
        setShowPaymentHistory(false);
        setQrDialogOpen(true); // Open QR dialog
        setTimeout(() => {
          setQrDialogOpen(false); // Close after 30 seconds
        }, 30000);
      } else {
        setShowQR(false);
        setShowPaymentHistory(false);
        setQrDialogOpen(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('Form validation failed.');
      return;
    }

    console.log('Form validated, showing confirmation dialog.');
    setConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setConfirmDialog(false);
    setLoading(true);
    console.log('Confirmation confirmed, attempting donation submission.');
    
    try {
      // Prepare data based on donation type
      const donationData = {
        donorName: formData.donorName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: formData.message,
        donationType: formData.donationType,
      };

      if (formData.donationType === 'monetary') {
        donationData.amount = parseFloat(formData.amount);
        donationData.paymentMethod = formData.paymentMethod;
        // For monetary, ensure item fields are null/undefined
        donationData.itemType = null;
        donationData.quantity = null;
        donationData.itemDescription = null;
      } else if (formData.donationType === 'item') {
        donationData.itemType = formData.itemType;
        donationData.quantity = parseInt(formData.quantity, 10);
        donationData.itemDescription = formData.itemDescription;
        // For item, ensure monetary fields are null/undefined
        donationData.amount = null;
        donationData.paymentMethod = null;
      }

      console.log('Sending donation data:', donationData);
      const response = await donationAPI.createDonation(donationData);
      console.log('Donation API response:', response.data);

      setNotification({
        open: true,
        message: 'Thank you! Your donation has been recorded.',
        severity: 'success'
      });
      // Reset form after successful donation
      setFormData({
        donationType: 'monetary',
        amount: '',
        paymentMethod: 'card',
        itemType: '',
        quantity: '',
        itemDescription: '',
        donorName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        city: '',
        message: ''
      });
      setShowQR(false);
      setShowPaymentHistory(false);
    } catch (error) {
      console.error('Donation submission error (frontend catch):', error.response?.data || error);
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Donation failed. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
      console.log('Donation submission process finished.');
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Helper to render form fields based on donation type
  const renderDonationTypeFields = () => {
    if (formData.donationType === 'monetary') {
      return (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Amount (₹)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              required
              inputProps={{ min: "1" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors.paymentMethod}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                label="Payment Method"
              >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="netbanking">Net Banking</MenuItem>
                <MenuItem value="qrcode">QR Code</MenuItem>
              </Select>
              {errors.paymentMethod && (
                <Typography color="error" variant="caption">
                  {errors.paymentMethod}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </>
      );
    } else if (formData.donationType === 'item') {
      return (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Item Type (e.g., Clothes, Food, Books)"
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              error={!!errors.itemType}
              helperText={errors.itemType}
              required
            />
          </Grid>
           <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              error={!!errors.quantity}
              helperText={errors.quantity}
              required
              inputProps={{ min: "1" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Description (Optional)"
              name="itemDescription"
              multiline
              rows={3}
              value={formData.itemDescription}
              onChange={handleChange}
            />
          </Grid>
        </>
      );
    }
    return null; // Should not happen
  };

  const renderConfirmationDetails = () => {
    if (formData.donationType === 'monetary') {
      return (
        <>
          <Typography>Amount: ₹{formData.amount}</Typography>
          <Typography>
            Payment Method: {formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1)}
          </Typography>
        </>
      );
    } else if (formData.donationType === 'item') {
      return (
        <>
          <Typography>Item Type: {formData.itemType}</Typography>
          <Typography>Quantity: {formData.quantity}</Typography>
          {formData.itemDescription && (
            <Typography>Description: {formData.itemDescription}</Typography>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Make a Donation
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Donation Type Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Donation Type</InputLabel>
                  <Select
                    name="donationType"
                    value={formData.donationType}
                    onChange={handleChange}
                    label="Donation Type"
                  >
                    <MenuItem value="monetary">Monetary Donation</MenuItem>
                    <MenuItem value="item">Item Donation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Fields based on Donation Type and QR code logic only in step 3 */}
              {activeStep === 3 && (
                <>
                  {renderDonationTypeFields()}
                </>
              )}

              {/* Common Fields */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleChange}
                  error={!!errors.donorName}
                  helperText={errors.donorName}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message (Optional)"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Donate Now'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Donation</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Donation Details
            </Typography>
            {renderConfirmationDetails()}
            <Typography>Donor: {formData.donorName}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Phone: {formData.phone}</Typography>
            <Typography>City: {formData.city}</Typography>
            {formData.message && <Typography>Message: {formData.message}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm Donation
          </Button>
        </DialogActions>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
        <DialogTitle>Scan to Pay</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            {formData.amount
              ? `Scan this QR to pay ₹${formData.amount}`
              : 'Scan this QR to pay'}
          </Typography>
          <img
            src="/images/ngo-qr.png"
            alt="NGO QR Code"
            style={{ width: 200, height: 200 }}
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
            This window will close automatically after 30 seconds.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Container>
  );
};

export default Donate;