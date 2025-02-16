import React, { useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Image as ImageIcon, 
  Tag, 
  Users, 
  DollarSign, 
  List,
  Building,
  Globe,
  Video,
  Star,
  Plus,
  Trash2
} from 'lucide-react';

const EventCreationForm = () => {
  const [agendaItems, setAgendaItems] = useState([{ time: '', title: '', description: '', speaker: '' }]);
  const [images, setImages] = useState([]);

  const addAgendaItem = () => {
    setAgendaItems([...agendaItems, { time: '', title: '', description: '', speaker: '' }]);
  };

  const removeAgendaItem = (index) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mt-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Create New Event</h1>
            <p className="mt-2 text-purple-100">Fill in the details to create your amazing event</p>
          </div>

          <form className="px-6 py-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <InputField
                  label="Event Name"
                  placeholder="Enter event name"
                  required
                />
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea 
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Detailed description of your event"
                    required
                  />
                </div>

                <InputField
                  label="Short Description"
                  placeholder="Brief summary (max 200 characters)"
                  required
                  maxLength={200}
                />
              </div>
            </div>

            {/* Date and Time Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Date and Time
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Event Date"
                  type="date"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Start Time"
                    type="time"
                    required
                  />
                  <InputField
                    label="End Time"
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Location Details
              </h2>
              
              <div className="space-y-4">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Select Location Type</option>
                  <option value="Physical">Physical</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Venue Name"
                    placeholder="Enter venue name"
                  />
                  <InputField
                    label="Address"
                    placeholder="Street address"
                  />
                  <InputField
                    label="City"
                    placeholder="City"
                  />
                  <InputField
                    label="State"
                    placeholder="State/Province"
                  />
                  <InputField
                    label="Country"
                    placeholder="Country"
                  />
                  <InputField
                    label="Virtual Link"
                    placeholder="Meeting link (if virtual)"
                  />
                </div>
              </div>
            </div>

            {/* Agenda Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <List className="w-5 h-5 text-purple-600" />
                  Event Agenda
                </h2>
                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {agendaItems.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Agenda Item {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeAgendaItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Time"
                        type="time"
                        value={item.time}
                      />
                      <InputField
                        label="Title"
                        placeholder="Session title"
                        value={item.title}
                      />
                      <div className="md:col-span-2">
                        <InputField
                          label="Description"
                          placeholder="Session description"
                          value={item.description}
                        />
                      </div>
                      <InputField
                        label="Speaker"
                        placeholder="Speaker name"
                        value={item.speaker}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                Additional Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
                    <option value="">Select Category</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Concert">Concert</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <InputField
                  label="Price"
                  type="number"
                  placeholder="0.00"
                  icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                />

                <InputField
                  label="Capacity"
                  type="number"
                  placeholder="Maximum attendees"
                  icon={<Users className="w-5 h-5 text-gray-400" />}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, type = "text", placeholder, required, maxLength, icon, value }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
            icon ? 'pl-10' : ''
          }`}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          value={value}
        />
      </div>
    </div>
  );
};

export default EventCreationForm;