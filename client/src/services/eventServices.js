import api from '../api/api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get('/api/v1/events');
    console.log(response)
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/api/v1/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/api/v1/events', eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/api/v1/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/api/v1/events/${id}`);
    return response.data;
  },

  registerForEvent: async (eventId) => {
    const response = await api.post(`/api/v1/events/${eventId}/register`);
    return response.data;
  }
};
