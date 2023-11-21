import React, { useEffect, useState } from 'react';

const EventList = ({ onViewDescription }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-bfqxl/endpoint/data/v1');
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        } else {
          console.error('Failed to fetch events:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <button onClick={() => onViewDescription(event._id)}>
              {event.partyName} - {event.activityDate}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

