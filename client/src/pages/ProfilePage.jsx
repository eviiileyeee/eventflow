import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext/ThemeContext";
import { useAuth } from '../context/AuthContext';
import GeneralSettings from '../components/subComponents/GeneralSettings';
import NotificationPage from './NotificationPage';
import UserProfile from '../components/subComponents/UserProfile';
import SecuritySettings from '../components/subComponents/SecuritySettings';
import ProfileHeader from '../components/subComponents/ProfileHeader';
import BillingSettings from '../components/subComponents/BillingSettings';
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
  const [activeTab, setActiveTab] = useState('profile');
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


 

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
        <div className="max-w-6xl mx-auto">
        <ProfileHeader user = {currentUser} />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-2">
              <SidebarLink icon={User} text="Profile" tab="profile" />
              <SidebarLink icon={Shield} text="Security" tab="security" />
              <SidebarLink icon={CreditCard} text="Billing" tab="billing" />
              <SidebarLink icon={Bell} text="Notifications" tab="notifications" />
              <SidebarLink icon={Settings} text="Settings" tab="settings" />
              
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
              {activeTab === 'profile' && <UserProfile user={currentUser} setTab = {setActiveTab}/>}
              {activeTab === 'settings' && <GeneralSettings   user = {currentUser} function = {setCurrentUser} />}
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
