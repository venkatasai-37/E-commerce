import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Header } from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Cart } from "./pages/Cart";
import Home from './pages/Home';
import Mens from './pages/mens';
import Womens from './pages/womens';
import Chatbot from './components/Chatbot';
import Recommendations from './pages/Recommendations';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
      <Chatbot />
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
