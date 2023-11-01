import { configureStore } from '@reduxjs/toolkit';
// import allTickersReducer from "../features/allTickersSlice";
import tickersReducer from '../features/tickersSlice';

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
