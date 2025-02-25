import api from "../api/api";

export const searchServices = {
  searchUser: async (username) => {
    if (!username?.trim()) return { user: [] };

    try {
      // Add timestamp to prevent 304
      const response = await api.get(`/search/${encodeURIComponent(username)}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'If-None-Match': '', // Clear ETag
          'If-Modified-Since': '' // Clear last-modified checking
        },
        // Add timestamp to URL to prevent caching
        params: {
          _t: Date.now()
        }
      });
      return response.data;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }
};