import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="chatbot-button"
        onClick={() => navigate("/recommendations")}
      >
        🤖
      </button>
    </div>
  );
};

export default Chatbot;

