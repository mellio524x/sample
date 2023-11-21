// /your-project/src/App.js
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import BlankLayout from "./Layout/BlankLayout";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layout/MainLayout";
import Homepage from "./pages/Homepage";
import EventSignupPage from "./pages/EventSignupPage";
import Signup from "./components/signup/Signup.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import EventPage from "./pages/EventPage";

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {/* Private routes */}
      {/* I will put AuthRequired here later */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="signup" element={<EventSignupPage />} />
      </Route>
      {/* Public routes */}
      <Route element={<BlankLayout />}>
        <Route path="hero" element={<LandingPage />} />
        <Route path="loginPage" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="EventPage" element={<EventPage />} />
        <Route path="Homepage" element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;

