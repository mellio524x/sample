import React from 'react';
import "./LandingPage.css";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
    <h1>Welcome to the Event App</h1>
    <p>Join us for exciting events!</p>
    <div>
      <Link to="/signup" className="button">Sign Up</Link> {/* Use Link component */}
      <Link to="/login" className="button">Log In</Link> {/* Use Link component */}
    </div>
  </div>
  )
}

export default LandingPage
