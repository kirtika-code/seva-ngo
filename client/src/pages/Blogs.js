import React, { useState, useEffect } from 'react';
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
  Chip,
  Paper,
  Avatar,
  Divider,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Comment as CommentIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const blogs = [
  {
    id: 1,
    title: 'The Impact of Community Gardens on Urban Sustainability',
    description: 'Exploring how community gardens are transforming urban spaces and promoting sustainable living practices.',
    image: '/images/garden.png',
    date: '2024-04-10',
    author: 'Priya Sharma',
    authorImage: 'https://source.unsplash.com/random/100x100?woman',
    category: 'Sustainability',
    readTime: '5 min read',
    content: `
      Community gardens have emerged as powerful tools for urban sustainability, transforming vacant lots into vibrant green spaces that benefit both the environment and local communities. These gardens not only provide fresh produce but also create opportunities for social interaction and environmental education.

      The benefits of community gardens extend far beyond food production. They help reduce urban heat islands, improve air quality, and promote biodiversity in city environments. Additionally, they serve as outdoor classrooms where people of all ages can learn about sustainable agriculture and environmental stewardship.

      Our recent initiative in the downtown area has shown remarkable results:
      • 30% increase in local biodiversity
      • 500+ families accessing fresh produce
      • 200+ volunteers engaged in maintenance
      • 15 educational workshops conducted

      The success of these gardens relies heavily on community involvement and proper planning. We've developed a comprehensive guide for starting and maintaining community gardens, which includes:
      1. Site selection and preparation
      2. Soil testing and improvement
      3. Plant selection and rotation
      4. Water management systems
      5. Community engagement strategies

      Looking ahead, we're planning to expand our community garden network to include more educational programs and partnerships with local schools. This expansion will help us reach more communities and create lasting impact on urban sustainability.
    `,
    tags: ['Community', 'Sustainability', 'Urban Farming', 'Education'],
    comments: [
      {
        id: 1,
        author: 'Rajesh Kumar',
        date: '2024-04-11T10:30:00Z',
        content: 'This is a great initiative! We need such gardens in our neighborhood. I have also started a kitchen garden at my home.'
      },
      {
        id: 2,
        author: 'Anita Patel',
        date: '2024-04-12T14:15:00Z',
        content: 'My children love learning about plants. They learned a lot in the workshop. Now they take care of plants daily.'
      },
      {
        id: 3,
        author: 'Vikram Singh',
        date: '2024-04-13T09:45:00Z',
        content: 'I have been volunteering at the community garden for 6 months. It has had a great impact on our neighborhood. People are now connecting with each other.'
      },
      {
        id: 11,
        author: 'Lakshmi Devi',
        date: '2024-04-14T11:20:00Z',
        content: 'I have started growing vegetables on my terrace. Now we get fresh vegetables and save money too.'
      },
      {
        id: 12,
        author: 'Ravi Shankar',
        date: '2024-04-15T15:30:00Z',
        content: 'We have also started such a garden in our school. The children are very excited and take care of the plants daily.'
      }
    ]
  },
  {
    id: 2,
    title: 'Youth Empowerment Through Technology Education',
    description: 'How our technology education programs are preparing young people for the digital future.',
    image: '/images/youth-technology.png',
    date: '2024-04-08',
    author: 'Arun Verma',
    authorImage: 'https://source.unsplash.com/random/100x100?man',
    category: 'Education',
    readTime: '4 min read',
    content: `
      In today's digital age, access to technology education is crucial for young people's future success. Our youth technology program has been making significant strides in bridging the digital divide and empowering the next generation.

      The program focuses on three key areas:
      1. Digital Literacy
      2. Coding and Programming
      3. Digital Citizenship

      Our approach combines hands-on learning with mentorship, creating an engaging environment where students can develop both technical and soft skills. The results have been promising:
      • 85% of participants report increased confidence in using technology
      • 70% show interest in pursuing tech-related careers
      • 90% of parents notice improved problem-solving skills

      The program's success lies in its adaptive curriculum and dedicated mentors. We've seen remarkable growth in participants' abilities to:
      • Think critically about technology
      • Solve complex problems
      • Collaborate effectively
      • Express creativity through digital tools

      As we look to the future, we're expanding our program to include more advanced topics and partnerships with tech companies for real-world experience.
    `,
    tags: ['Technology', 'Youth', 'Education', 'Digital Skills'],
    comments: [
      {
        id: 4,
        author: 'Sunita Gupta',
        date: '2024-04-09T11:20:00Z',
        content: 'This program has been very beneficial for my daughter. Now she wants to pursue a career in technology. She is very interested in learning coding.'
      },
      {
        id: 5,
        author: 'Rahul Mehta',
        date: '2024-04-09T15:45:00Z',
        content: 'The coding workshops are excellent. My son has learned a lot in just a few weeks. I would recommend this program to all parents.'
      },
      {
        id: 6,
        author: 'Neha Sharma',
        date: '2024-04-10T09:30:00Z',
        content: 'Great initiative! Will there be advanced courses for older children? My son is in 12th grade and wants to learn AI.'
      },
      {
        id: 13,
        author: 'Kiran Desai',
        date: '2024-04-16T13:45:00Z',
        content: 'I am a software engineer and I have volunteered in this program. It is great to see the enthusiasm of the children.'
      },
      {
        id: 14,
        author: 'Vijay Malhotra',
        date: '2024-04-17T10:15:00Z',
        content: 'My company is supporting this program. We have donated 10 computers and our engineers are also volunteering.'
      }
    ]
  },
  {
    id: 3,
    title: 'Building Resilient Communities Through Disaster Preparedness',
    description: 'Our comprehensive approach to disaster preparedness and community resilience.',
    image: '/images/disaster.png',
    date: '2024-04-05',
    author: 'Dr. Meera Kapoor',
    authorImage: 'https://source.unsplash.com/random/100x100?woman2',
    category: 'Community',
    readTime: '6 min read',
    content: `
      Disaster preparedness is crucial for community resilience, especially in areas prone to natural disasters. Our comprehensive program has been helping communities build the necessary skills and infrastructure to respond effectively to emergencies.

      The program covers essential aspects of disaster preparedness:
      • Emergency response planning
      • First aid training
      • Community communication systems
      • Resource management
      • Evacuation procedures

      Our recent initiatives have shown significant impact:
      • 15 communities trained in disaster preparedness
      • 1,000+ individuals certified in first aid
      • 50 emergency response teams established
      • 100+ evacuation drills conducted

      The key to success has been community engagement and regular training. We've developed a framework that includes:
      1. Risk assessment
      2. Resource mapping
      3. Communication protocols
      4. Training schedules
      5. Evaluation metrics

      Moving forward, we're focusing on expanding our reach and incorporating new technologies for better disaster response coordination.
    `,
    tags: ['Disaster Relief', 'Community', 'Safety', 'Training'],
    comments: [
      {
        id: 7,
        author: 'Amit Kumar',
        date: '2024-04-06T13:20:00Z',
        content: 'The training sessions were very informative and well-organized. Our community is now better prepared for disasters.'
      },
      {
        id: 8,
        author: 'Pooja Singh',
        date: '2024-04-07T10:15:00Z',
        content: 'The first aid training was particularly useful. I learned how to provide first aid in emergency situations.'
      },
      {
        id: 9,
        author: 'Suresh Patel',
        date: '2024-04-08T16:45:00Z',
        content: 'The evacuation drills were very helpful. We now have a clear plan for emergency situations. All families are aware of it.'
      },
      {
        id: 10,
        author: 'Deepika Sharma',
        date: '2024-04-09T11:30:00Z',
        content: 'Great program! Will there be more advanced training sessions in the future? I would also like training on cybersecurity.'
      },
      {
        id: 15,
        author: 'Dr. Sanjay Verma',
        date: '2024-04-18T09:20:00Z',
        content: 'I am a doctor and I helped with the first aid training. It is very important to increase people\'s knowledge.'
      },
      {
        id: 16,
        author: 'Meena Kumari',
        date: '2024-04-19T14:30:00Z',
        content: 'We have also organized such training in our school. It is very important to make children aware about safety.'
      }
    ]
  }
];

const Blogs = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (blog) => {
    setSelectedBlog(blog);
    // Load comments for this specific blog
    const savedComments = localStorage.getItem('blogComments');
    const allComments = savedComments ? JSON.parse(savedComments) : {};
    // If no saved comments, use default comments from blog object
    setComments(allComments[blog.id] || blog.comments || []);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBlog(null);
    setCommentText('');
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please login to comment',
        severity: 'warning'
      });
      return;
    }

    if (!commentText.trim()) {
      setSnackbar({
        open: true,
        message: 'Comment cannot be empty',
        severity: 'error'
      });
      return;
    }

    const newComment = {
      id: Date.now(), // Unique ID for each comment
      author: user.name,
      date: new Date().toISOString(),
      content: commentText.trim()
    };

    // Update comments for the current blog
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Save to localStorage
    const savedComments = localStorage.getItem('blogComments');
    const allComments = savedComments ? JSON.parse(savedComments) : {};
    allComments[selectedBlog.id] = updatedComments;
    localStorage.setItem('blogComments', JSON.stringify(allComments));

    setCommentText('');
    setSnackbar({
      open: true,
      message: 'Comment added successfully',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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
          <Typography variant="h3" component="h1" gutterBottom>
            Our Blog
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Stories, insights, and updates from our community initiatives
          </Typography>
        </Paper>

        {/* Blogs Grid */}
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} md={4} key={blog.id}>
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
                  image={blog.image}
                  alt={blog.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={blog.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {blog.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {new Date(blog.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{blog.author}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{blog.readTime}</Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenDialog(blog)}
                  >
                    Read More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Blog Details Dialog */}
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
          {selectedBlog && (
            <>
              <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h5" component="div">
                  {selectedBlog.title}
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
                <Box sx={{ mb: 3 }}>
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={selectedBlog.authorImage}
                    alt={selectedBlog.author}
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{selectedBlog.author}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(selectedBlog.date).toLocaleDateString()} • {selectedBlog.readTime}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {selectedBlog.content}
                </Typography>

                <Box sx={{ mt: 3, mb: 2 }}>
                  {selectedBlog.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Comments ({comments.length})
                </Typography>

                {/* Comment Form */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder={isAuthenticated ? "Write a comment..." : "Please login to comment"}
                    value={commentText}
                    onChange={handleCommentChange}
                    disabled={!isAuthenticated}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleCommentSubmit}
                    disabled={!isAuthenticated || !commentText.trim()}
                  >
                    Post Comment
                  </Button>
                </Box>

                {/* Comments List */}
                {comments.map((comment, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                        {comment.author.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{comment.author}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(comment.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ ml: 6 }}>
                      {comment.content}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}

                {comments.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No comments yet. Be the first to comment!
                  </Typography>
                )}
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<BookmarkIcon />}
                  sx={{ mr: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  sx={{ mr: 1 }}
                >
                  Share
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CommentIcon />}
                >
                  Comment
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default Blogs; 