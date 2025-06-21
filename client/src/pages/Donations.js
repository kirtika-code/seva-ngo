import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { donationAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct
import QRCode from 'qrcode.react';

const donorTypes = [
  'Individual',
  'Corporate',
  'Foundation',
  'Government',
  'Other',
];

// List of Indian states
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
];

const donationAmounts = [
  { value: 10, label: '₹10' },
  { value: 25, label: '₹25' },
  { value: 50, label: '₹50' },
  { value: 100, label: '₹100' },
  { value: 250, label: '₹250' },
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1000' },
  { value: 'custom', label: 'Custom Amount' },
];

const steps = ['Donor Information', 'Location Details', 'Donation Amount', 'Confirmation'];

const Donations = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [activeStep, setActiveStep] = useState(0);
  const [donorData, setDonorData] = useState({
    donorName: '',
    donorType: '',
    contactNumber: '',
    email: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    donationAmount: '',
    customAmount: '',
    paymentMethod: 'credit',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [thankYouDialogOpen, setThankYouDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
    }
  }, [isAuthenticated]);

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
    navigate('/login');
  };

  const handleLoginDialogCancel = () => {
    setLoginDialogOpen(false);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Show QR dialog for 30s if QR Code is selected
    if (name === 'paymentMethod' && value === 'qrcode') {
      setQrDialogOpen(true);
      setTimeout(() => {
        setQrDialogOpen(false);
        // Automatically click Next after QR dialog closes
        if (nextButtonRef.current) {
          nextButtonRef.current.click();
        }
      }, 30000);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 0: // Donor Information
        if (!donorData.donorName) newErrors.donorName = 'Name is required';
        if (!donorData.donorType) newErrors.donorType = 'Donor type is required';
        if (!donorData.contactNumber) {
          newErrors.contactNumber = 'Contact number is required';
        } else if (!/^[0-9]{10}$/.test(donorData.contactNumber)) {
          newErrors.contactNumber = 'Please enter a valid 10-digit number';
        }
        if (!donorData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(donorData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!donorData.gender) newErrors.gender = 'Gender is required';
        break;

      case 1: // Location Details
        if (!donorData.address) newErrors.address = 'Address is required';
        if (!donorData.city) newErrors.city = 'City is required';
        if (!donorData.state) newErrors.state = 'State is required';
        if (!donorData.pincode) {
          newErrors.pincode = 'PIN code is required';
        } else if (!/^[0-9]{6}$/.test(donorData.pincode)) {
          newErrors.pincode = 'Please enter a valid 6-digit PIN code';
        }
        break;

      case 2: // Donation Amount
        if (!donorData.donationAmount) {
          newErrors.donationAmount = 'Please select or enter a donation amount';
        } else if (donorData.donationAmount === 'custom' && !donorData.customAmount) {
          newErrors.customAmount = 'Please enter a custom amount';
        }
        if (!donorData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields correctly',
        severity: 'error'
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      // Transform the data to match backend model
      const donationData = {
        donorName: donorData.donorName,
        email: donorData.email,
        phone: donorData.contactNumber,
        city: donorData.city,
        message: `Donation from ${donorData.donorName} (${donorData.donorType})`,
        // For monetary donations
        amount: parseFloat(donorData.donationAmount === 'custom' ? donorData.customAmount : donorData.donationAmount),
        paymentMethod: donorData.paymentMethod,
        donationType: 'monetary' // Since this form is for monetary donations
      };

      console.log('Sending donation data:', donationData);
      const response = await donationAPI.createDonation(donationData);
      console.log('Donation API response:', response);
      
      if (response.success) {
        // Show success message
        setSnackbar({
          open: true,
          message: 'Donation successful!',
          severity: 'success'
        });
        
        // Reset form data
        setDonorData({
          donorName: '',
          donorType: '',
          contactNumber: '',
          email: '',
          gender: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India',
          donationAmount: '',
          customAmount: '',
          paymentMethod: 'credit',
        });
      }
    } catch (error) {
      console.error('Donation submission error:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to submit donation. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCompleteDonation = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await handleSubmit();
      setThankYouDialogOpen(true);
    } catch (error) {
      console.error('Error in handleCompleteDonation:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleThankYouDialogClose = () => {
    setThankYouDialogOpen(false);
    navigate('/donation-history');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="donorName"
                value={donorData.donorName}
                onChange={handleInputChange}
                error={!!errors.donorName}
                helperText={errors.donorName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.donorType}>
                <InputLabel>Donor Type</InputLabel>
                <Select
                  name="donorType"
                  value={donorData.donorType}
                  onChange={handleInputChange}
                  label="Donor Type"
                >
                  {donorTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.donorType && (
                  <Typography color="error" variant="caption">
                    {errors.donorType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Mobile Number"
                name="contactNumber"
                type="tel"
                value={donorData.contactNumber}
                onChange={handleInputChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber || "Enter 10-digit mobile number"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={donorData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={donorData.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography color="error" variant="caption">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={donorData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={donorData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.state}>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={donorData.state}
                  onChange={handleInputChange}
                  label="State"
                >
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && (
                  <Typography color="error" variant="caption">
                    {errors.state}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="PIN Code"
                name="pincode"
                value={donorData.pincode}
                onChange={handleInputChange}
                error={!!errors.pincode}
                helperText={errors.pincode || "Enter 6-digit PIN code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={donorData.country}
                disabled
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Donation Amount
              </Typography>
              <Grid container spacing={2}>
                {donationAmounts.map((amount) => (
                  <Grid item xs={6} sm={3} key={amount.value}>
                    <Button
                      variant={
                        donorData.donationAmount === amount.value
                          ? 'contained'
                          : 'outlined'
                      }
                      fullWidth
                      onClick={() => {
                        setDonorData((prev) => ({
                          ...prev,
                          donationAmount: amount.value,
                        }));
                        if (errors.donationAmount) {
                          setErrors(prev => ({
                            ...prev,
                            donationAmount: ''
                          }));
                        }
                      }}
                    >
                      {amount.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              {errors.donationAmount && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {errors.donationAmount}
                </Typography>
              )}
            </Grid>
            {donorData.donationAmount === 'custom' && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Custom Amount (₹)"
                  name="customAmount"
                  type="number"
                  value={donorData.customAmount}
                  onChange={handleInputChange}
                  error={!!errors.customAmount}
                  helperText={errors.customAmount}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.paymentMethod}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={donorData.paymentMethod}
                  onChange={handleInputChange}
                  label="Payment Method"
                >
                  <MenuItem value="credit">Credit Card</MenuItem>
                  <MenuItem value="debit">Debit Card</MenuItem>
                  <MenuItem value="netbanking">Net Banking</MenuItem>
                  <MenuItem value="upi">UPI</MenuItem>
                  <MenuItem value="qrcode">QR Code</MenuItem>
                </Select>
                {errors.paymentMethod && (
                  <Typography color="error" variant="caption">
                    {errors.paymentMethod}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Donation Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Name:</Typography>
                      <Typography>{donorData.donorName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Email:</Typography>
                      <Typography>{donorData.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Mobile Number:</Typography>
                      <Typography>{donorData.contactNumber}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Address:</Typography>
                      <Typography>{donorData.address}, {donorData.city}, {donorData.state}, {donorData.pincode}, {donorData.country}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Donation Amount:</Typography>
                      <Typography>
                        ₹
                        {donorData.donationAmount === 'custom'
                          ? donorData.customAmount
                          : donorData.donationAmount}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Payment Method:</Typography>
                      <Typography>
                        {donorData.paymentMethod.charAt(0).toUpperCase() +
                          donorData.paymentMethod.slice(1)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        {/* Login Required Dialog */}
        <Dialog
          open={loginDialogOpen}
          onClose={handleLoginDialogCancel}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          }}
        >
          <DialogTitle sx={{ 
            m: 0, 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid #eee'
          }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Login Required
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleLoginDialogCancel}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Please Login to Continue
              </Typography>
              <Typography variant="body1" color="text.secondary">
                You need to be logged in to make a donation. This helps us keep track of your contributions and provide you with donation history.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
            <Button 
              onClick={handleLoginDialogCancel} 
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLoginDialogClose} 
              variant="contained"
              startIcon={<PersonIcon />}
            >
              Login Now
            </Button>
          </DialogActions>
        </Dialog>

        {/* Thank You Dialog */}
        <Dialog
          open={thankYouDialogOpen}
          onClose={handleThankYouDialogClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          }}
        >
          <DialogContent sx={{ p: 4, textAlign: 'center' }}>
            <FavoriteIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Thank You for Your Donation!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Your generous contribution will make a significant difference in our community.
              We truly appreciate your support.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleThankYouDialogClose}
              sx={{ mt: 2 }}
            >
              View Donation History
            </Button>
          </DialogContent>
        </Dialog>

        {/* QR Code Dialog */}
        <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
          <DialogTitle>Scan to Pay</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              {donorData.donationAmount === 'custom'
                ? `Scan this QR to pay ₹${donorData.customAmount}`
                : donorData.donationAmount
                  ? `Scan this QR to pay ₹${donorData.donationAmount}`
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

        {/* Only show donation form if user is authenticated */}
        {isAuthenticated && (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Make a Donation
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
              Your contribution makes a difference in our community
            </Typography>

            <Stepper activeStep={activeStep} sx={{ my: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box component="form" onSubmit={handleCompleteDonation}>
              {renderStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleCompleteDonation}
                  >
                    Complete Donation
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    size="large"
                    ref={nextButtonRef}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Donations; 