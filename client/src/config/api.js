const API_URL = 'http://localhost:5000/api';

export const endpoints = {
  auth: {
    register: `${API_URL}/auth/register`,
    login: `${API_URL}/auth/login`,
    me: `${API_URL}/auth/me`
  },
  donations: {
    list: `${API_URL}/donations`,
    create: `${API_URL}/donations`,
    get: (id) => `${API_URL}/donations/${id}`,
    update: (id) => `${API_URL}/donations/${id}`,
    delete: (id) => `${API_URL}/donations/${id}`
  },
  projects: {
    list: `${API_URL}/projects`,
    create: `${API_URL}/projects`,
    get: (id) => `${API_URL}/projects/${id}`,
    update: (id) => `${API_URL}/projects/${id}`,
    delete: (id) => `${API_URL}/projects/${id}`
  },
  events: {
    list: `${API_URL}/events`,
    create: `${API_URL}/events`,
    get: (id) => `${API_URL}/events/${id}`,
    update: (id) => `${API_URL}/events/${id}`,
    delete: (id) => `${API_URL}/events/${id}`
  },
  volunteers: {
    list: `${API_URL}/volunteers`,
    create: `${API_URL}/volunteers`,
    get: (id) => `${API_URL}/volunteers/${id}`,
    update: (id) => `${API_URL}/volunteers/${id}`,
    delete: (id) => `${API_URL}/volunteers/${id}`
  }
}; 