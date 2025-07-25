import axios from 'axios';

const API_URL = 'http://localhost:8001/api/users';

// Google Auth - Get user data
export const googleLogin = async (token) => {
    try {
        const res = await axios.post(`${API_URL}/google-login`, { token });
        return res.data;
    } catch (error) {
        console.error("Google Login Error:", error.response?.data || error);
        throw error;
    }
};

// Check if user is logged in
export const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${API_URL}/current-user`, {
            withCredentials: true, // Ensures session cookies are included
        });
        return res.data;
    } catch (error) {
        return null; // No user found
    }
};
