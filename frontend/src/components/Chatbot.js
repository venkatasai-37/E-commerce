import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Chatbot = () => {
  const navigate = useNavigate();  // Use useNavigate hook to navigate programmatically
  return (
    <div>
        <button className="chatbot-button" onClick={() => navigate('/recommendations')}>
          🤖
    </button>
    </div>
  )
}

export default Chatbot;



// const Chatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const navigate = useNavigate();  // ✅ Added this line

//   const handleSend = () => {
//     if (input.trim()) {
//       const userMessage = { sender: "user", text: input };
//       setMessages((prev) => [...prev, userMessage]);
//       try {
//         const res =  axios.post("http://localhost:8000/chat", { query: input });
//         const botMessage = { sender: "bot", text: res.data.result };  // Update as per your response format
//         setMessages((prev) => [...prev, botMessage]);
//       } catch (error) {
//         console.error("LLM API error:", error);
//         const errorMessage = { sender: "bot", text: "Sorry, something went wrong." };
//         setMessages((prev) => [...prev, errorMessage]);
//       }

//       navigate("/recommendations", { state: { query: input } });  // Now works!
//       setInput("");
//     }
//   };

//   return (
//     <div>
//       <div className="chatbot-button" onClick={() => setOpen(!open)}>
//         🤖
//       </div>

//       {open && (
//         <div className="chatbot-box">
//           <div className="chatbot-messages">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`chatbot-msg ${msg.sender}`}>
//                 {msg.sender} : {msg.text}
//               </div>
//             ))}
//           </div>

//           <input
//             type="text"
//             className="chatbot-input"
//             placeholder="Ask for a product..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
//           />
//           <button className="chatbot-send" onClick={handleSend}>
//             Send
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
