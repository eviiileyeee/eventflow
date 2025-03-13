// services/notificationService.js
import api from '../api/api';

export const notificationService = {
    postNotifications: async (data) => {
        console.log('Sending notification:', data);
        try {
            const response = await api.post('/api/notifications', data);
            console.log('Notification created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating notification:', error.response?.data || error.message);
            return null;
        }
    },

    getNotifications: async () => {
        try {
            const response = await api.get('/api/notifications');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error.response?.data || error.message);
            return [];
        }
    },

    markAsRead: async (id) => {
        try {
            const response = await api.patch(`/api/notifications/${id}`, { read: true }); // Assuming API expects this
            return response.data;
        } catch (error) {
            console.error('Error marking notification as read:', error.response?.data || error.message);
            return null;
        }
    },

    markAllAsRead: async () => {
        try {
            const response = await api.patch('/api/notifications/mark-all-read');
            return response.data;
        } catch (error) {
            console.error('Error marking all notifications as read:', error.response?.data || error.message);
            return null;
        }
    },

    deleteNotification: async (id) => {
        try {
            const response = await api.delete(`/api/notifications/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting notification:', error.response?.data || error.message);
            return null;
        }
    }
};
