import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';

const jobListings = [
  {
    id: 1,
    title: 'Program Manager',
    location: 'Hubli, India',
    type: 'Full-time',
    description:
      'We are seeking an experienced Program Manager to oversee our community development initiatives.',
    requirements: [
      'Bachelor\'s degree in Social Work or related field',
      '5+ years of program management experience',
      'Strong leadership and communication skills',
      'Experience in non-profit sector preferred',
    ],
  },
  {
    id: 2,
    title: 'Community Outreach Coordinator',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Join our team as a Community Outreach Coordinator to help build and maintain relationships with local communities.',
    requirements: [
      'Bachelor\'s degree in Communications or related field',
      '3+ years of community engagement experience',
      'Excellent interpersonal skills',
      'Experience with social media and digital marketing',
    ],
  },
  {
    id: 3,
    title: 'Grant Writer',
    location: 'Remote',
    type: 'Part-time',
    description:
      'We are looking for a skilled Grant Writer to help secure funding for our programs.',
    requirements: [
      'Bachelor\'s degree in English, Communications, or related field',
      '2+ years of grant writing experience',
      'Strong research and writing skills',
      'Experience with non-profit grant applications',
    ],
  },
];

const Careers = () => {
  const theme = useTheme();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseDialog = () => {
    setSelectedJob(null);
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the application to your backend
    console.log('Application submitted:', { job: selectedJob, ...applicationForm });
    setSnackbar({
      open: true,
      message: 'Thank you for your application! We will review it and get back to you soon.',
      severity: 'success',
    });
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Join Our Team
          </Typography>
          <Typography variant="h5">
            Make a difference in your community while building your career
          </Typography>
        </Container>
      </Box>

      {/* Job Listings */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Current Openings
        </Typography>
        <Grid container spacing={4}>
          {jobListings.map((job) => (
            <Grid item key={job.id} xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {job.location} • {job.type}
                  </Typography>
                  <Typography paragraph>{job.description}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleJobClick(job)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Application Dialog */}
      <Dialog
        open={Boolean(selectedJob)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Apply for {selectedJob?.title}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={applicationForm.name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={applicationForm.email}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  Upload Resume
                  <input
                    type="file"
                    name="resume"
                    hidden
                    onChange={handleFormChange}
                    accept=".pdf,.doc,.docx"
                  />
                </Button>
                {applicationForm.resume && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {applicationForm.resume.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Cover Letter"
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default Careers; 