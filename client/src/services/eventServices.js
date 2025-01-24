import api from './api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get('/api/events');
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/api/events', eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/api/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  },

  registerForEvent: async (eventId) => {
    const response = await api.post(`/api/events/${eventId}/register`);
    return response.data;
  }
};
