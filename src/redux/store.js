// 📁 src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Adding cart reducer to the store
    },
});
