import React from "react";


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

  export default SecuritySettings;