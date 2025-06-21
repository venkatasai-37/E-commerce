// src/context/CartContext.js
import  {createContext, useState, useContext } from "react";

// Create the Cart Context
const CartContext = createContext();

// Define the Cart Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Function to add a product to the cart
  const addToCart = (productId) => {
    setCartItems((prev) => [...prev, productId]); // Append new productId to array
  };

  return(
    <CartContext.Provider value={{ cartItems, addToCart }}>
    {children} 
    </CartContext.Provider>
  )
    
}

// Custom hook to access cart data easily in any component
export const useCart = () => useContext(CartContext);
