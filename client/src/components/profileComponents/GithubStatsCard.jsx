import React, { useState, useEffect } from 'react';
import { Users, GitFork, Star, BookOpen } from 'lucide-react';

const GitHubStatsCard = (props) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true);
    }
      try {
        setLoading(true);
        if(!props.user.githubUrl){
          setLoading(false)
          setError("Update yout GitHub URL in the settings")
          return;
        }
        const response = await fetch(`https://api.github.com/users/${props.user.githubUrl.slice(19)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [props.user]);

  if (loading) {
    return (
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md ">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="w-auto max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-500 ease-out dark:bg-gray-800">
      {/* Header Section */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {userData.name || userData.login}
            </h2>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-blue-500 transition-all duration-500 ease-out dark:text-gray-400"
            >
              @{userData.login}
            </a>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {userData.bio && (
          <p className="mb-4 text-gray-600 dark:text-gray-200">{userData.bio}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500 dark:text-gray-200" />
            <span className="text-sm text-gray-600 dark:text-gray-200">
              {userData.followers} followers · {userData.following} following
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-200" />
            <span className="text-sm text-gray-600 dark:text-gray-200">
              {userData.public_repos} repositories
            </span>
          </div>

          {userData.location && (
            <div className="col-span-2 flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-200">
                📍 {userData.location}
              </span>
            </div>
          )}

          {userData.company && (
            <div className="col-span-2 flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                🏢 {userData.company}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsCard;