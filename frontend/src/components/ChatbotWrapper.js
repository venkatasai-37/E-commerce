import React from 'react';
import { useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';

export const ChatbotWrapper = () => {
  const location = useLocation();
  
  if (location.pathname !== '/recommendations') {
    return <Chatbot />;
  }
  return null;
};

//this component conditionally renders the Chatbot component based on the current route. If the route is not '/recommendations', it displays the Chatbot; otherwise, it returns null, effectively hiding the Chatbot when on the recommendations page.