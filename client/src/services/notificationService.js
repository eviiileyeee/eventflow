// services/notificationService.js
import api from './api';

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get('/api/notifications');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.patch(`/api/notifications/${id}`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch('/api/notifications/mark-all-read');
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await api.delete(`/api/notifications/${id}`);
    return response.data;
  }
};
