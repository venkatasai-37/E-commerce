import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";


const Recommendations = ({ products = [] }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

const ChatSection = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/chatbot", { 
        query: input 
      });
      
      const botMessage = { 
        sender: "bot", 
        text: response.data.result 
      };
      
      if (response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
      }
      else {
        setProducts([]);
      }
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Chatbot API error:", error);
      const errorMessage = { 
        sender: "bot", 
        text: "Sorry, I couldn't process your request right now." 
      };
      setMessages(prev => [...prev, errorMessage]);
      setProducts([]);
    } finally {
      setIsLoading(false);
  
    }
  };

  return (
    <div className="recommendations-page">
      <div className="products-section">
        {products.length > 0 ? (
          <div className="recommendations-section">
            <h2>Recommended Products</h2>
            <Recommendations products={products} />
          </div>
        ) : (
          <div className="empty-state">
            <h2>Ask me about products!</h2>
            <p>I can help you find the perfect items based on your preferences.</p>
          </div>
        )}
      </div>

      <div className="chat-section">
        <div className="chatbot-box">
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg ${msg.sender}`}>
                <span className="sender">{msg.sender === "bot" ? "🤖" : "👤"}</span>
                <span className="message">{msg.text}</span>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-msg bot">
                <span className="sender">🤖</span>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask for products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button 
              className="chatbot-send" 
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;


