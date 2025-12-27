import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import transactionReducer from './slices/transactionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  transactions: transactionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Expõe a store globalmente para os microfrontends
(window as any).__BYTEBANK_STORE__ = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
