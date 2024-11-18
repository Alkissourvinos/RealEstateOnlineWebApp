import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./user-ads/slice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Configure Redux store with the ads reducer
export const store = configureStore({
  reducer: {
    ads: adsReducer,
  },
});

// Create TypeScript types for the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed versions of useDispatch and useSelector hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
