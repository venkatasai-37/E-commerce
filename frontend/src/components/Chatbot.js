import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Store chat history

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);

      try {
        // Call Express API which calls Python service
        const res = await axios.post("/api/chatbot", { query: input });
        const products = res.data;

        const botMessage = {
          sender: "bot",
          text: `Recommended products:\n` + products.map(p => `• ${p.name} - ₹${p.price}`).join("\n")
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        console.error("Chatbot API error:", err);
        setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I couldn’t get recommendations." }]);
      }

      setInput("");
    }
  };

  return (
    <div>
      <div className="chatbot-button" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <input
            type="text"
            className="chatbot-input"
            placeholder="Ask for a product..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button className="chatbot-send" onClick={handleSend}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
