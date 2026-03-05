import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MilkType, SizeType, TempType } from '@/data/menuData';

export interface CartItem {
    cartId: string; // unique: id + size + milk + temp
    id: string;
    name: string;
    image: string;
    categoryId: string;
    basePrice: number;
    size: SizeType;
    milk: MilkType;
    temp: TempType | 'N/A';
    finalPrice: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(i => i.cartId === action.payload.cartId);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(i => i.cartId !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ cartId: string; quantity: number }>) {
            const item = state.items.find(i => i.cartId === action.payload.cartId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart(state) {
            state.items = [];
        },
        toggleCart(state) {
            state.isOpen = !state.isOpen;
        },
        closeCart(state) {
            state.isOpen = false;
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart, toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, i) => sum + i.finalPrice * i.quantity, 0);
