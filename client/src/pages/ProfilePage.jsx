import React, { useState } from 'react';
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
  const [darkMode, setDarkMode] = useState(false);

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
    <div className="flex items-center space-x-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <img
        src="/api/placeholder/80/80"
        alt="Profile"
        className="h-20 w-20 rounded-full"
      />
      <div>
        <h2 className="text-2xl font-bold dark:text-white">John Doe</h2>
        <p className="text-gray-600 dark:text-gray-400">john.doe@example.com</p>
        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
          <Github className="h-4 w-4 mr-1" />
          <span>johndoe</span>
        </div>
      </div>
    </div>
  );

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4 dark:text-white">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4 dark:text-white">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium dark:text-white">Theme</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize your interface theme
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium dark:text-white">Email Notifications</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your email preferences
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Security Settings</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium dark:text-white">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Add an extra layer of security to your account
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Enable 2FA
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
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
                  <p className="font-medium dark:text-white">Premium Plan</p>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
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
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'general' && <GeneralSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'billing' && <BillingSettings />}
              {/* Add other tab contents as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;