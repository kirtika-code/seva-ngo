import axios from 'axios';
import { endpoints } from '../config/api';

const API_URL = 'http://localhost:5002/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Donation API
export const donationAPI = {
  getRecentDonations: () => api.get('/donations/recent'),
  getMyDonations: () => api.get('/donations/my-donations'),
  createDonation: (data) => api.post('/donations/donate', data),
  getDonations: () => api.get('/donations'),
  getDonation: (id) => api.get(`/donations/${id}`),
  updateDonation: (id, data) => api.put(`/donations/${id}`, data),
  deleteDonation: (id) => api.delete(`/donations/${id}`)
};

// Donations API
export const donationsAPI = {
  list: () => api.get(endpoints.donations.list),
  create: (donationData) => api.post(endpoints.donations.create, donationData),
  get: (id) => api.get(endpoints.donations.get(id)),
  update: (id, donationData) => api.put(endpoints.donations.update(id), donationData),
  delete: (id) => api.delete(endpoints.donations.delete(id))
};

// Projects API
export const projectsAPI = {
  list: () => api.get(endpoints.projects.list),
  create: (projectData) => api.post(endpoints.projects.create, projectData),
  get: (id) => api.get(endpoints.projects.get(id)),
  update: (id, projectData) => api.put(endpoints.projects.update(id), projectData),
  delete: (id) => api.delete(endpoints.projects.delete(id))
};

// Events API
export const eventsAPI = {
  list: () => api.get(endpoints.events.list),
  create: (eventData) => api.post(endpoints.events.create, eventData),
  get: (id) => api.get(endpoints.events.get(id)),
  update: (id, eventData) => api.put(endpoints.events.update(id), eventData),
  delete: (id) => api.delete(endpoints.events.delete(id))
};

// Volunteers API
export const volunteersAPI = {
  list: () => api.get(endpoints.volunteers.list),
  create: (volunteerData) => api.post(endpoints.volunteers.create, volunteerData),
  get: (id) => api.get(endpoints.volunteers.get(id)),
  update: (id, volunteerData) => api.put(endpoints.volunteers.update(id), volunteerData),
  delete: (id) => api.delete(endpoints.volunteers.delete(id))
};

export default api; 