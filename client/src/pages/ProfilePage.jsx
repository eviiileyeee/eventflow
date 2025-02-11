import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../components/ThemeContext/ThemeContext";
import { useAuth } from '../context/AuthContext';
import GeneralSettings from '../components/GeneralSettings';
import NotificationPage from './NotificationPage';
import {
  User,
  Settings,
  Key,
  Shield,
  CreditCard,
  Github,
  Building,
  ChevronRight,
  Bell,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, checkAuth , logout } = useAuth();
  const [currentUser , setCurrentUser] = useState(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const SidebarLink = ({ icon: Icon, text, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
        ${activeTab === tab 
          ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </button>
  );

  const ProfileHeader = () => (
    <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow">
      <img
        src={ user.profileImage}
        alt="https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"
        className="h-20 w-20 rounded-full"
      />
      <div>
        <h2 className="text-2xl font-bold dark:text-white">{user.username}</h2>
        <p className="text-gray-600 dark:text-gray-400">{user.email.slice(0,14)}...</p>
        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400"
         onClick={() => window.open(user.githubUrl, '_blank')}>
          <Github className="h-4 w-4 mr-1" />
          <span>Github</span>
        </div>
      </div>
    </div>
  );

 
  const SecuritySettings = () => (
    <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
      <h3 className="text-lg  font-medium mb-4 dark:text-white ">Security Settings</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium dark:text-white">Recovery Email</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400  mb-2">
            Set up an email to recover your account
          </p>
          <div className="flex items-center space-x-2">
            <input
            type="email"
            className="w-full p-2 rounded-lg dark:bg-gray-700 dark:text-gray-300
            "
            placeholder="Enter your recovery email"
            />
          </div>
          <button className=" mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            verify
          </button>
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <h4 className="font-medium dark:text-white">Password</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Last changed 3 months ago
          </p>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );

  const BillingSettings = () => (
    <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Billing Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <div>
              <p className="font-medium dark:text-white">Visa ending in 4242</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/24</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Edit
          </button>
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <h4 className="font-medium dark:text-white">Billing History</h4>
          <div className="mt-2 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium dark:text-white">Event Registered</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {`March ${i}, 2024`}
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-300">$29.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
        <div className="max-w-6xl mx-auto">
          <ProfileHeader />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-2">
              <SidebarLink icon={User} text="General" tab="general" />
              <SidebarLink icon={Shield} text="Security" tab="security" />
              <SidebarLink icon={CreditCard} text="Billing" tab="billing" />
              <SidebarLink icon={Bell} text="Notifications" tab="notifications" />
              <SidebarLink icon={Building} text="Teams" tab="teams" />
              
              <div className="pt-4 mt-4 border-t dark:border-gray-700">
                <button className="w-full flex items-center bg-gray-200
                 space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                 onClick={logout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'general' && <GeneralSettings   user = {currentUser} function = {setCurrentUser} />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'billing' && <BillingSettings />}
              { activeTab === 'notifications' && <NotificationPage /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
