import React, { useState , useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import {
  Bell,
  Mail,
  ShieldCheck,
  AlertCircle,
  Clock,
  Check,
  Trash2,
  Settings,
  Filter
} from 'lucide-react';

const NotificationPage = () => {
  const { user } = useAuth(); // Destructure to get just the user object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications();
      setNotifications(response.data.map(notification => ({
        ...notification,
        icon: iconType(notification.icon)
      })));
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    if (filter === 'security') return notif.type === 'security';
    if (filter === 'alerts') return notif.type === 'alert';
    if (filter === 'messages') return notif.type === 'message';
    return true;
  });

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };


  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(notifications.filter(notif => notif.id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };


  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA] 
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-gray-700 dark:text-gray-200" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs
             font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {notifications.filter(n => !n.read).length} new
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
          {['all', 'unread', 'read', 'security', 'alerts', 'messages'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === filterType
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Settings Dropdown */}
        {isSettingsOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notification Settings
            </h3>
            <div className="space-y-4">
              <button
                onClick={markAllAsRead}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Mark all as read
              </button>
              {/* Add more settings options here */}
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-gray-200 dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all ${!notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {notification.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No notifications
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                When you get notifications, they'll show up here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;


/* 
const iconType = (icon) => {
    switch (icon) {
      case 1:
        return <ShieldCheck className="w-5 h-5 text-green-500" />;
      case 2:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 3:
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 4:
        return <Check className="w-5 h-5 text-green-500" />;
      default:
        return <Trash2 className="w-5 h-5 text-red-500" />;
    }
  }

  */