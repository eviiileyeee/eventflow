// services/notificationService.js
import api from '../api/api';

export const notificationService = {

    postNotifications: async (data) => {
        console.log(data);
        try {
            const response = await api.post('/api/notifications', data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
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
