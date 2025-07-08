# AI Shop - Intelligent E-commerce Platform

An AI-powered e-commerce platform that combines traditional shopping with intelligent product recommendations using natural language processing.

## Features

- **AI-Powered Shopping Assistant**
  - Natural language product search
  - Intelligent product recommendations
  - Contextual conversations about products
  - Real-time responses using LLM technology

- **E-commerce Functionality**
  - Product browsing by category (Men's/Women's)
  - Shopping cart management
  - Product details with images and descriptions
  - User-friendly interface

## Architecture

### Frontend (`/frontend`)
- Built with React.js
- Responsive design
- Real-time chat interface
- Product catalog display

### Backend (`/backend`)
- Express.js server
- MongoDB database
- RESTful API endpoints
- Product and cart management

### RAG Chatbot (`/Rag_chatbot`)
- FastAPI server
- LangChain integration
- FAISS vector database
- Ollama LLM implementation

## Technical Stack

- **Frontend**: React.js, CSS3, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **AI Components**: 
  - LangChain
  - FAISS Vector Store
  - Ollama LLM
  - FastAPI
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- Ollama

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-shop.git
cd ai-shop
```

2. **Backend Setup**
```bash
cd backend
npm install
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

4. **RAG Chatbot Setup**
```bash
cd Rag_chatbot
pip install -r requirements.txt
uvicorn app:app --reload
```

5. **Environment Variables**
Create `.env` file in the Rag_chatbot directory:
```
HUGGINGFACEHUB_API_TOKEN=your_token_here
```

##  Project Structure

```
ai-shop/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── public/
├── backend/
│   ├── routes/
│   ├── models/
│   └── server.js
└── Rag_chatbot/
    ├── app.py
    ├── llm_chain.py
    ├── vector_db.py
    └── requirements.txt
```

## Usage

1. Start all three servers (backend, frontend, and RAG chatbot)
2. Access the application at `http://localhost:3000`
3. Use the chat interface to:
   - Ask about products
   - Get recommendations
   - Search for specific items
   - Browse categories

## AI Assistant Features

- **Product Search**: "Show me red t-shirts under $30"
- **Recommendations**: "What shoes would go well with blue jeans?"
- **General Queries**: "Tell me about your summer collection"
- **Price Inquiries**: "What's the price range for your dresses?"

## API Endpoints

### Product API
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Cart API
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/:id` - Remove from cart

### Chatbot API
- `POST /chat` - Chat with AI assistant

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- LangChain for AI capabilities
- MongoDB for database
- React team for frontend framework
