import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };
    initAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/api/users/me');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', { email, password });
      const token = response.data.token;
      const { user } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/users/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };
  
  const updateUser = async (updatedUser) => {
    try {
      console.log("Inside update route::::");
  
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("_id", updatedUser._id);
      formData.append("username", updatedUser.username);
      formData.append("email", updatedUser.email);
      formData.append("phoneNumber", updatedUser.phoneNumber);
      formData.append("githubUrl", updatedUser.githubUrl);
      formData.append("facebookUrl", updatedUser.facebookUrl);
      formData.append("instagramUrl", updatedUser.instagramUrl);
  
      // Only append file if it's available
      if (updatedUser.profileImage) {
        formData.append("profileImage", updatedUser.profileImage);
      }
  
      // Send FormData request with proper headers
      const response = await api.put(`/api/users/uploadDetails/${updatedUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Required for file upload
        },
      });
  
      const { user } = response.data;
      console.log("User returned by server:", user);
      setUser(user);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth , updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
