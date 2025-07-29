import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Share2, Users, Ticket,
  ArrowLeft, ExternalLink, BookOpen
} from 'lucide-react';

const EventFullView = ({ event }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.name,
          text: event?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fce7f3] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
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
            {/* Single Event Image */}
            {event?.image?.url && (
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
                <img
                  src={event.image.url}
                  alt={event?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event Details */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {event?.name}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(event?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{event?.time?.start} - {event?.time?.end}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>
                    {event?.location?.type === 'Virtual'
                      ? 'Online Event'
                      : `${event?.location?.venue}, ${event?.location?.city}`}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{event?.registrations?.length || 0} attendees</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {event?.description}
                </p>
              </div>
            </div>

            {/* Agenda */}
            {event?.agenda?.length > 0 && (
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Event Schedule
                </h2>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 text-gray-500 dark:text-gray-400">{item.time}</div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {event?.price === 0 ? 'Free' : `$${event?.price}`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">per ticket</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Ticket className="w-5 h-5 mr-2" />
                    <span>{event?.ticketsAvailable || 0} tickets remaining</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRegistering(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                >
                  Register Now
                </button>

                {event?.location?.virtualLink && (
                  <a
                    href={event.location.virtualLink}
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
