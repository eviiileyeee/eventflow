import React, { useState, useCallback, useRef } from 'react';
import { Search, User, Loader, AlertCircle, Github, Instagram, Linkedin, Phone } from 'lucide-react';
import debounce from 'lodash/debounce';
import { searchServices } from '../../services/searchServices';
import { useNavigate } from 'react-router-dom';

const SearchUserPage = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const abortControllerRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
  
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) {
        setUser(null);
        setIsLoading(false);
        return;
      }
  
      const controller = new AbortController();
      abortControllerRef.current = controller;
      setIsLoading(true);
      setError(null);
  
      try {
        const result = await searchServices.searchUser(trimmedQuery);
        if (result && result._id) {
          setUser(result);
        } else {
          setUser(null);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Failed to fetch user. Please try again later.");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md relative mt-12">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
        />
      </div>

      <div className="mt-6 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        {error && (
          <div className="flex items-center gap-2 p-4 mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ) : user ? (
          <div className="flex flex-col gap-4 p-4"
           key={user.id}
           onClick={() => Navigate(`/search/${user.username}`)}
           > 
            <div className="flex items-center gap-4">
              <img 
                src={user.profileImage} 
                alt={user.username}
                className="h-16 w-16 object-cover rounded-full border-2 border-indigo-500"
              />
              <div>
                <h3 className="font-semibold text-lg">@{user.username}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        ) : query ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No user found
          </p>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            Start typing to search users
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchUserPage;