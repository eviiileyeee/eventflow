import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { notificationService } from '../services/notificationService';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(formData.email, formData.password);
      setSuccess('Logged in successfully');
      notificationService.postNotifications({id: 1,
        type: 'security',
        title: 'New login detected',
        message: 'A new login was detected from Chrome on Windows.',
        timestamp: '2024-01-22T10:30:00',
        read: false,
        icon: 1,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA]
     dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Logging in
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Dont have an account?
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-[#8194B0] hover:text-black dark:bg-[#8194B0] dark:text-black dark:hover:bg-gray-950 dark:hover:text-white '
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? 'wait a moment...' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
