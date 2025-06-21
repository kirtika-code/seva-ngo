# NGO Management System - Backend

This is the backend server for the NGO Management System.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ngo-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Make sure MongoDB is running on your system.

4. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user info

### Donations
- POST `/api/donations` - Create new donation
- GET `/api/donations` - Get all donations (admin only)
- GET `/api/donations/my-donations` - Get user's donations
- GET `/api/donations/:id` - Get donation by ID
- PATCH `/api/donations/:id/status` - Update donation status (admin only)

## Models

### User
- name (String)
- email (String)
- password (String)
- role (String: 'admin', 'volunteer', 'donor')
- contactNumber (String)
- address (Object)
- gender (String)
- createdAt (Date)

### Donation
- donor (ObjectId - ref: User)
- amount (Number)
- donorType (String)
- paymentMethod (String)
- status (String)
- transactionId (String)
- notes (String)
- createdAt (Date) 