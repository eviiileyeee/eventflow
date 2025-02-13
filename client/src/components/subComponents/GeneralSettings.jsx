import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Sun, Moon } from "lucide-react";

const GeneralSettings = () => {
  const { updateUser, user, checkAuth } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const initialFormData = useMemo(() => ({
    username: user?.username || "",
    email: user?.email || "",
    _id: user?._id,
    phoneNumber: user?.phoneNumber || "",
    githubUrl: user?.githubUrl || "",
    facebookUrl: user?.facebookUrl || "",
    instagramUrl: user?.instagramUrl || "",
    profileImage: null,
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await updateUser(formData);
        console.log("Form submitted:", formData);
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
      }
    },
    [updateUser, formData]
  );

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4 dark:text-white">Personal Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["phoneNumber", "githubUrl", "facebookUrl", "instagramUrl"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4 dark:text-white">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium dark:text-white">Theme</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customize your interface theme</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Disabled Email Notifications */}
          <div className="flex items-center justify-between cursor-not-allowed opacity-50">
            <div>
              <h4 className="font-medium dark:text-white">Email Notifications</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your email preferences
              </p>
            </div>
            <label className="relative inline-flex items-center">
              <input type="checkbox" className="sr-only peer" disabled />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
