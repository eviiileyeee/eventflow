import React from 'react';
import EventFullView from './EventFullView';
import { useParams } from 'react-router-dom'; // Import useParams


// Wrapper component to handle data fetching and passing
const EventFullViewWrapper = () => {
  const { id } = useParams();
  // You would typically fetch event data here based on the ID
  // For demo purposes, we'll use dummy data
  const event = {
    id: 1,
    name: "Summer Music Festival 2024",
    description: "Join us for an unforgettable evening of live music performances featuring local and international artists. Experience the magic of music under the stars.",
    date: "2024-06-15",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, New York",
    attendees: 250,
    price: 49.99,
    ticketsAvailable: 100,
    virtualEventUrl: "https://zoom.us/j/123456789",
    images: [
      "https://placehold.co/1200x600/4A90E2/ffffff?text=Festival+1",
      "https://placehold.co/1200x600/F5A623/ffffff?text=Festival+2",
      "https://placehold.co/1200x600/D0E6F1/333333?text=Festival+3"
    ],
    agenda: [
      {
        time: "6:00 PM",
        title: "Doors Open",
        description: "Welcome drink and registration"
      },
      {
        time: "7:00 PM",
        title: "Opening Act",
        description: "Local band performance"
      },
      {
        time: "8:30 PM",
        title: "Main Performance",
        description: "Headliner band takes the stage"
      },
      {
        time: "10:30 PM",
        title: "Closing Act",
        description: "Final performance and closing ceremony"
      }
    ]
  };

  return <EventFullView event={event} />;
};

export default EventFullViewWrapper;
