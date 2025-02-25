import React from "react";
import {
    CreditCard,
} from "lucide-react"
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


  export default BillingSettings;