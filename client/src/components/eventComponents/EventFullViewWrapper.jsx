import React, { useEffect, useState } from 'react';
import EventFullView from './EventFullView';
import { useParams } from 'react-router-dom';
import { eventService } from '../../services/eventServices';

const EventFullViewWrapper = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await eventService.getEventById(id);
        setEvent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading event...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  if (!event) return null;

  return <EventFullView event={event} />;
};

export default EventFullViewWrapper;
