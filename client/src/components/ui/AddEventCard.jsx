import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { Navigate , Link } from 'react-router-dom';

const AddEventCard = () => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center  bg-white shadow-sm transition-all duration-500 p-3  dark:bg-gray-900">
      <div className='flex flex-col items-center justify-center border-2 border-dotted border-indigo-400 px-20 py-10 rounded'>
      <div className=" mb-4 flex items-center justify-center rounded-lg border-2 border-gray-200 text-gray-400">
        <Plus size={24} />
      </div>
      
      <h2 className="text-lg font-medium text-indigo-600 mb-2 dark:text-indigo-600">Create Event</h2>
      <p className="text-gray-500 text-center mb-6 dark:text-gray-400">Get started by creating a new event.</p>
      
      <Link to="/create"> <button  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
        <Plus size={20} />
        <span>New Event</span>
      </button>
      </Link>
      </div>
    </div>
  );
};

export default AddEventCard;