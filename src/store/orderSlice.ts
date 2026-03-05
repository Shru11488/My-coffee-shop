import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    placedAt: string;
}

interface OrderState {
    currentOrder: Order | null;
}

const initialState: OrderState = {
    currentOrder: null,
};

function generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `BH-${year}-${rand}`;
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        placeOrder(
            state,
            action: PayloadAction<{ items: CartItem[]; subtotal: number; tax: number; total: number }>
        ) {
            state.currentOrder = {
                orderNumber: generateOrderNumber(),
                items: action.payload.items,
                subtotal: action.payload.subtotal,
                tax: action.payload.tax,
                total: action.payload.total,
                placedAt: new Date().toISOString(),
            };
        },
        clearOrder(state) {
            state.currentOrder = null;
        },
    },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const selectCurrentOrder = (state: { order: OrderState }) => state.order.currentOrder;
