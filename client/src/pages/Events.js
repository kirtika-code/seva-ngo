import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'Community Health Fair',
    description: 'Join us for a day of health screenings, wellness workshops, and community activities.',
    image: '/images/community-health-fair.png',
    date: '2024-04-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Community Center, 123 Main St',
    capacity: 200,
    registered: 120,
    category: 'Health',
    activities: [
      'Free health screenings',
      'Nutrition workshops',
      'Fitness demonstrations',
      'Children\'s activities'
    ],
    requirements: 'Open to all ages. No registration fee.',
    contact: 'health@ngo.org'
  },
  {
    id: 2,
    title: 'Environmental Cleanup Day',
    description: 'Help us make our community cleaner and greener through this hands-on environmental initiative.',
    image: '/images/environment.png',
    date: '2024-04-20',
    time: '9:00 AM - 2:00 PM',
    location: 'City Park, 456 Park Ave',
    capacity: 150,
    registered: 85,
    category: 'Environment',
    activities: [
      'Beach cleanup',
      'Tree planting',
      'Recycling workshop',
      'Environmental education'
    ],
    requirements: 'Bring gloves and water bottle. Ages 12+ welcome.',
    contact: 'environment@ngo.org'
  },
  {
    id: 3,
    title: 'Youth Leadership Workshop',
    description: 'Empower young leaders through interactive workshops and team-building activities.',
    image: '/images/youth-workshop.jpg',
    date: '2024-04-25',
    time: '1:00 PM - 5:00 PM',
    location: 'Youth Center, 789 Youth St',
    capacity: 100,
    registered: 45,
    category: 'Education',
    activities: [
      'Leadership training',
      'Public speaking practice',
      'Team building exercises',
      'Career exploration'
    ],
    requirements: 'Ages 14-18. Registration required.',
    contact: 'youth@ngo.org'
  }
];

const Events = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    comments: ''
  });

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
    setRegistrationOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      experience: '',
      comments: ''
    });
  };

  const handleOpenRegistration = () => {
    setRegistrationOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log('Registration submitted:', formData);
    handleCloseDialog();
    // Show success message or redirect
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            mb: 6,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            color: 'white',
          }}
        >
          <EventIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Upcoming Events
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join us in making a difference through community events
          </Typography>
        </Paper>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={event.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.time}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {event.registered}/{event.capacity} registered
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenDialog(event)}
                    disabled={event.registered >= event.capacity}
                  >
                    {event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Event Details Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          }}
        >
          {selectedEvent && (
            <>
              <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h5" component="div">
                  {selectedEvent.title}
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                {!registrationOpen ? (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <img
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </Box>
                    <Typography paragraph>
                      {selectedEvent.description}
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                          Event Details
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>
                            {new Date(selectedEvent.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>{selectedEvent.time}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>{selectedEvent.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography>
                            {selectedEvent.registered}/{selectedEvent.capacity} registered
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                          Activities
                        </Typography>
                        {selectedEvent.activities.map((activity, index) => (
                          <Typography key={index} sx={{ mb: 1 }}>
                            • {activity}
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Requirements
                      </Typography>
                      <Typography paragraph>{selectedEvent.requirements}</Typography>
                      <Typography variant="h6" gutterBottom>
                        Contact
                      </Typography>
                      <Typography>{selectedEvent.contact}</Typography>
                    </Box>
                  </>
                ) : (
                  <Box component="form" onSubmit={handleSubmitRegistration}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          label="Age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Previous Experience</InputLabel>
                          <Select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            label="Previous Experience"
                          >
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="beginner">Beginner</MenuItem>
                            <MenuItem value="intermediate">Intermediate</MenuItem>
                            <MenuItem value="expert">Expert</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Additional Comments"
                          name="comments"
                          multiline
                          rows={4}
                          value={formData.comments}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  sx={{ mr: 1 }}
                >
                  Close
                </Button>
                {!registrationOpen ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenRegistration}
                    disabled={selectedEvent.registered >= selectedEvent.capacity}
                  >
                    Register Now
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitRegistration}
                  >
                    Submit Registration
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Events;