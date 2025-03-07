// 📁 src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [] // Array to hold cart items with { productId, quantity }
};

const cartSlice = createSlice({
    name: 'cart', // Name of the slice
    initialState, // Initial state of the slice
    reducers: { // Reducer functions to handle state changes
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if the item exists
            } else {
                state.items.push({ productId: action.payload.productId, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.productId !== action.payload.productId);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.productId !== action.payload.productId);
                }
            }
        }
    }
});

// Exporting actions to be used in components
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Exporting the reducer to be used in the store
export default cartSlice.reducer;
