// EventSignupPage.jsx

import React from 'react';
import Signup from '../components/signup/Signup';

const EventSignupPage = () => {
  const handleSignup = (formData) => {
    // Handle signup logic here (e.g., send data to server)
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h2>Event Signup</h2>
      <Signup onSignup={handleSignup} />
    </div>
  );
};

export default EventSignupPage;
