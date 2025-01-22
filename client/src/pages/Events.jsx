import React, { useState } from 'react';
import { Calendar, MapPin, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Events = () => {
  // Sample event data
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Summer Music Festival",
      description: "Join us for an unforgettable evening of live music performances featuring local and international artists. Experience the magic of music under the stars.",
      date: "2024-06-15",
      location: "Central Park, New York",
      status: "upcoming",
      images: [
        "https://placehold.co/600x400/4A90E2/ffffff?text=Concert+1",
        "https://placehold.co/600x400/F5A623/ffffff?text=Concert+2",
        "https://placehold.co/600x400/D0E6F1/333333?text=Concert+3"
      ]
    },
    {
      id: 2,
      name: "Tech Conference 2024",
      description: "A premier technology conference bringing together industry leaders, innovators, and developers to share insights and explore the future of tech.",
      date: "2024-03-20",
      location: "Convention Center, San Francisco",
      status: "completed",
      images: [
        "https://placehold.co/600x400/4A90E2/ffffff?text=Tech+1",
        "https://placehold.co/600x400/F5A623/ffffff?text=Tech+2"
      ]
    }
  ]);

  const EventCard = ({ event }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isUploadActive, setIsUploadActive] = useState(false);

    const nextImage = () => {
      setCurrentImageIndex((prev) => 
        prev === event.images.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => 
        prev === 0 ? event.images.length - 1 : prev - 1
      );
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Image Carousel */}
        <div className="relative h-64 w-full">
          <img 
            src={event.images[currentImageIndex]} 
            alt={`${event.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Carousel Controls */}
          {event.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {event.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Upload Overlay */}
          <div 
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${
              isUploadActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsUploadActive(true);
            }}
            onDragLeave={() => setIsUploadActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsUploadActive(false);
              // Handle file upload here
            }}
          >
            <div className="text-white text-center">
              <Upload className="mx-auto mb-2" />
              <p>Drop images here or click to upload</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {event.name}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.status === 'upcoming' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
            }`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {event.description}
          </p>

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
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Events
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
