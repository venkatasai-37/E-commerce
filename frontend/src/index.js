import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./styles.css";
import { Header } from './components/Header';
import { Cart } from "./pages/Cart";
import Home from './pages/Home';
import Mens from './pages/mens';
import Womens from './pages/womens';
import Chatbot from './components/Chatbot';
import ChatSection from './pages/Recommendations';

// Create a wrapper component for conditional rendering
const ChatbotWrapper = () => {
  const location = useLocation();
  
  // Only show chatbot if we're not on the recommendations page
  if (location.pathname !== '/recommendations') {
    return <Chatbot />;
  }
  
  return null;
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/recommendations" element={<ChatSection />} />
      </Routes>
      <ChatbotWrapper />
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
