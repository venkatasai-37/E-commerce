import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { ChatbotWrapper } from "./ChatbotWrapper";
import { Cart } from "../pages/Cart";
import Home from "../pages/Home";
import Mens from "../pages/mens";
import Womens from "../pages/womens";
import ChatSection from "../pages/Recommendations";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/recommendations" element={<ChatSection />} />
        </Routes>
      </main>
      <ChatbotWrapper />
    </>
  );
};

export default App;
