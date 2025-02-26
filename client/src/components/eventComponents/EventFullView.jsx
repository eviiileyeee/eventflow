import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Users,
  Ticket,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const EventFullView = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Carousel Navigation
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-br from-transparent via-[rgba(145,165,202,0.4)] to-transparent dark:bg-gradient-to-br dark:from-transparent dark:via-[rgba(55,65,81,0.4)] dark:to-transparent shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <img
                src={event?.images[currentImageIndex]}
                alt={`Event ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {event?.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {event.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Event Details */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {event?.name}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(event?.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{event?.time}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{event?.attendees} attendees</span>
                </div>
              </div>

              {/* Event Description */}
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {event?.description}
                </p>
              </div>
            </div>

            {/* Agenda/Schedule */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Event Schedule
              </h2>
              <div className="space-y-4">
                {event?.agenda?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-24 text-gray-500 dark:text-gray-400">
                      {item.time}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Registration */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {event?.price === 0 ? 'Free' : `$${event?.price}`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    per ticket
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Ticket className="w-5 h-5 mr-2" />
                    <span>{event?.ticketsAvailable} tickets remaining</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRegistering(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                >
                  Register Now
                </button>

                {event?.virtualEventUrl && (
                  <a
                    href={event.virtualEventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join Virtual Event
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFullView;
