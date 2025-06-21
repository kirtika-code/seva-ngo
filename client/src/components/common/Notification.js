import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ 
          width: '100%',
          minWidth: severity === 'success' ? '200px' : 'auto',
          maxWidth: severity === 'success' ? '300px' : 'auto',
          '& .MuiAlert-message': {
            fontSize: severity === 'success' ? '0.9rem' : 'inherit'
          }
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification; 