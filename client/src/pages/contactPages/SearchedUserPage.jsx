import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Calendar, MapPin, Link as LinkIcon, Twitter } from 'lucide-react';
import { searchServices } from '../../services/searchServices';

const SearchedUserPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await searchServices.searchUser(username);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        console.log("server respond with ", data);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="text-center text-red-500">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-6 flex flex-col items-center border-b border-gray-200">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img
                src={userData.avatar || "/api/placeholder/200/200"}
                alt={`${userData.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <div className="text-gray-500 flex items-center gap-1">
              <User size={16} />
              <span>@{userData.username}</span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            {userData.bio && (
              <p className="text-center text-gray-700 mb-6">{userData.bio}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <span>{userData.email}</span>
                </div>
              )}
              
              {userData.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{userData.location}</span>
                </div>
              )}
              
              {userData.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <LinkIcon size={18} />
                  <a href={userData.website} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-blue-500 hover:underline">
                    {userData.website}
                  </a>
                </div>
              )}
              
              {userData.twitter && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Twitter size={18} />
                  <a href={`https://twitter.com/${userData.twitter}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-500 hover:underline">
                    @{userData.twitter}
                  </a>
                </div>
              )}
              
              {userData.joinedDate && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>Joined {new Date(userData.joinedDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {userData.stats && (
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.stats.followers}
                  </div>
                  <div className="text-gray-500">Followers</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.stats.following}
                  </div>
                  <div className="text-gray-500">Following</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.stats.posts}
                  </div>
                  <div className="text-gray-500">Posts</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedUserPage;