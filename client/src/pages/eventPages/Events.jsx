import React, { useState, useEffect, useCallback } from 'react';
import EventCard from './component/EventCard';
import { eventService } from '../../services/eventServices';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
     

      const response = await eventService.getAllEvents();
      console.log('API Response:', response.data);

      if (response) {
        setEvents(response.data);
      } else {
        console.warn('No events found in response');
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-[#f4f0ff] dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="text-center text-gray-800 dark:text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-white mx-auto mb-4"></div>
        <p>Loading events...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA] dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="text-center text-red-500 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f4f0ff] dark:from-gray-900 dark:via-gray-800 dark:to-black p-2 md:p-8 pb-20">
      <div className="relative top-10 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl uppercase font-bold text-gray-800 dark:text-white m-8">
          Events
        </h1>

        {events.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-gray-800 dark:text-white">No events available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
