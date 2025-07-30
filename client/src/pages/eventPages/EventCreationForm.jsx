import React, { useState , useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/eventComponents/ImageUpload';
import { eventService } from '../../services/eventServices';
import InputField from './component/InputField';
import {useAuth} from "../../context/AuthContext"

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
  Trash2,
  AlertCircle
} from 'lucide-react';


// Initial form state
const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  shortDescription: '',
  date: '',
  time: { start: '', end: '' },
  location: {
    type: '',
    venue: '',
    address: '',
    city: '',
    state: '',
    country: '',
    virtualLink: ''
  },
  image: null,
  category: '',
  price: 0,
  capacity: 0,
  status: 'draft',
  agenda: [{ time: '', title: '', description: '', speaker: '' }],
  tags: '',
  featured: false
};




const EventCreationForm = () => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);



 const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => {
      // Handle nested object updates
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: value
          }
        };
      }
      
      // Handle regular and checkbox fields
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  }, []);


// Agenda item management
const handleAgendaChange = useCallback((index, field, value) => {
  setFormData(prevData => {
    const updatedAgenda = [...prevData.agenda];
    updatedAgenda[index] = {
      ...updatedAgenda[index],
      [field]: value
    };
    
    return {
      ...prevData,
      agenda: updatedAgenda
    };
  });
}, []);

const addAgendaItem = useCallback(() => {
  setFormData(prevData => ({
    ...prevData,
    agenda: [...prevData.agenda, { time: '', title: '', description: '', speaker: '' }]
  }));
}, []);

const removeAgendaItem = useCallback((index) => {
  setFormData(prevData => ({
    ...prevData,
    agenda: prevData.agenda.filter((_, i) => i !== index)
  }));
}, []);

// Image handling
const handleImageChange = useCallback((file) => {
  setFormData(prevData => ({
    ...prevData,
    image: file
  }));
}, []);

const removeImage = useCallback(() => {
  setFormData(prevData => ({
    ...prevData,
    image: null
  }));
}, []);

// Form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    // Prepare form data for submission
    const tagsArray = formData.tags 
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];
    
    // Create FormData for multipart/form-data
    const formSubmissionData = new FormData();
    
    // Prepare event data (excluding image)
    const eventData = {
      ...formData,
      tags: tagsArray
    };
    delete eventData.image;
    
    // Append event data as JSON
    formSubmissionData.append('eventData', JSON.stringify(eventData));
    
    // Append image file if present
    if (formData.image) {
      formSubmissionData.append('image', formData.image);
    }

    // Submit event
    const response = await eventService.createEvent(formSubmissionData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Navigate to event details or list
    navigate(`/events/${response.data._id}`);
  } catch (err) {
    console.error('Event creation error:', err);
    setError(err.response?.data?.message || 'Failed to create event. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8 px-0 md:px-8`}>
      <div className="mt-10 max-w-4xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Create New Event</h1>
            <p className="mt-2 text-purple-100">Fill in the details to create your amazing event</p>
          </div>

          {error && (
            <div className="mx-6 mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form className="px-6 py-8 space-y-8" onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <Star className="w-5 h-5 text-purple-600" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <InputField
                  label="Event Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  required
                  darkMode={darkMode}
                />
                
                <div className="space-y-4">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full h-32 px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                    placeholder="Detailed description of your event"
                    required
                  />
                </div>

                <InputField
                  label="Short Description"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief summary (max 200 characters)"
                  required
                  maxLength={200}
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Event Images */}
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Event Images
              </h2>
              <ImageUpload 
                className="mt-4" 
                onChange={handleImageChange} 
                currentImage={formData.image}
                onRemove={removeImage}
                darkMode={darkMode}
              />
            </div>

            {/* Date and Time Section */}
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <Calendar className="w-5 h-5 text-purple-600" />
                Date and Time
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Event Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                  required
                  darkMode={darkMode}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Start Time"
                    name="time.start"
                    value={formData.time.start}
                    onChange={handleChange}
                    type="time"
                    required
                    darkMode={darkMode}
                  />
                  <InputField
                    label="End Time"
                    name="time.end"
                    value={formData.time.end}
                    onChange={handleChange}
                    type="time"
                    required
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <MapPin className="w-5 h-5 text-purple-600" />
                Location Details
              </h2>
              
              <div className="space-y-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location Type
                </label>
                <select 
                  name="location.type"
                  value={formData.location.type}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                  required
                >
                  <option value="">Select Location Type</option>
                  <option value="Physical">Physical</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Venue Name"
                    name="location.venue"
                    value={formData.location.venue}
                    onChange={handleChange}
                    placeholder="Enter venue name"
                    darkMode={darkMode}
                  />
                  <InputField
                    label="Address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    darkMode={darkMode}
                  />
                  <InputField
                    label="City"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    placeholder="City"
                    darkMode={darkMode}
                  />
                  <InputField
                    label="State"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    placeholder="State/Province"
                    darkMode={darkMode}
                  />
                  <InputField
                    label="Country"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleChange}
                    placeholder="Country"
                    darkMode={darkMode}
                  />
                  {(formData.location.type === 'Virtual' || formData.location.type === 'Hybrid') && (
                    <InputField
                      label="Virtual Link"
                      name="location.virtualLink"
                      value={formData.location.virtualLink}
                      onChange={handleChange}
                      placeholder="Meeting link (if virtual)"
                      darkMode={darkMode}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Agenda Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
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
                {formData.agenda.map((item, index) => (
                  <div key={index} className={`p-4 border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg space-y-4`}>
                    <div className="flex justify-between items-center">
                      <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Agenda Item {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeAgendaItem(index)}
                        className="text-red-600 hover:text-red-700"
                        disabled={formData.agenda.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Time"
                        type="time"
                        value={item.time}
                        onChange={(e) => handleAgendaChange(index, 'time', e.target.value)}
                        darkMode={darkMode}
                      />
                      <InputField
                        label="Title"
                        placeholder="Session title"
                        type="text"
                        value={item.title}
                        onChange={(e) => handleAgendaChange(index, 'title', e.target.value)}
                        darkMode={darkMode}
                      />
                      <div className="md:col-span-2">
                        <InputField
                          label="Description"
                          type="text"
                          placeholder="Session description"
                          value={item.description}
                          onChange={(e) => handleAgendaChange(index, 'description', e.target.value)}
                          darkMode={darkMode}
                        />
                      </div>
                      <InputField
                        label="Speaker"
                        placeholder="Speaker name"
                        value={item.speaker}
                        onChange={(e) => handleAgendaChange(index, 'speaker', e.target.value)}
                        darkMode={darkMode}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <Tag className="w-5 h-5 text-purple-600" />
                Additional Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                    required
                  >
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
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                  darkMode={darkMode}
                />

                <InputField
                  label="Capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Maximum attendees"
                  min="1"
                  required
                  icon={<Users className="w-5 h-5 text-gray-400" />}
                  darkMode={darkMode}
                />

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Enter tags separated by commas"
                    className={`mt-1 w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>

                <div>
                  <label className={`flex items-center space-x-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                    />
                    <span>Featured Event</span>
                  </label>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-md focus:ring-purple-500 focus:border-purple-500`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                disabled={loading}
              >

                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};




export default EventCreationForm;