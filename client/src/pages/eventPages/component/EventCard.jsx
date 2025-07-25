import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';



const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === event?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? event?.images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="cursor-pointer bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Carousel */}
      <div className="relative h-64 w-full">
        <img
          src={event?.image?.url}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {event.name}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${event.status === 'upcoming'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
              }`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex flex-row">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {event.location.venue
                  ? `${event.location.venue}, ${event.location.city}, ${event.location.state}`
                  : "Location not available"}
              </span>

            </div>
            <div>
              <button
                onClick={handleClick}
                className="bg-[#151C29] text-white px-4 py-2 rounded-lg hover:bg-[#A6B8D6] hover:text-black transition-all"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EventCard;