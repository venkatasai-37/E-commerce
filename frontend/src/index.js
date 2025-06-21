import React, { StrictMode} from 'react';
import { createRoot } from "react-dom/client";
import "./styles.css";
import  {Header} from './components/Header';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import {Cart} from "./pages/Cart";
import Home from './pages/Home';
import  Mens  from './pages/mens';
import  Womens  from './pages/womens';
// import { CartProvider } from './context/CartContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Chatbot from './components/Chatbot';


// A simple React functional component
const App = () => {
  
  return (
  <>
  {/* <CartProvider> */}
  <Router>
  <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/mens' element={<Mens />}/>
        <Route path='/womens' element={<Womens />}/>
    </Routes>
    <Chatbot />
  </Router>
  {/* </CartProvider> */}
  </>

)}


// Render the App component inside the root div
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}> {/* Providing the store to the entire app */}
      <App />
  </Provider>
    
);


