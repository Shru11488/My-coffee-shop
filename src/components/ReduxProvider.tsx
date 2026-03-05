'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from 'react-hot-toast';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#2C1810',
                        color: '#FDF6EC',
                        border: '1px solid #C8860A',
                        borderRadius: '12px',
                        fontFamily: 'Inter, sans-serif',
                    },
                    success: { iconTheme: { primary: '#C8860A', secondary: '#FDF6EC' } },
                    error: { iconTheme: { primary: '#e74c3c', secondary: '#FDF6EC' } },
                }}
            />
        </Provider>
    );
}
