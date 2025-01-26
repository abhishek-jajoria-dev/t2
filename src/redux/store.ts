// import { configureStore } from "@reduxjs/toolkit";
// import quickViewReducer from "./features/quickView-slice";
// import cartReducer from "./features/cart-slice";
// import wishlistReducer from "./features/wishlist-slice";
// import productDetailsReducer from "./features/product-details";

// import { TypedUseSelectorHook, useSelector } from "react-redux";

// export const store = configureStore({
//   reducer: {
//     quickViewReducer,
//     cartReducer,
//     wishlistReducer,
//     productDetailsReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import { TypedUseSelectorHook, useSelector } from "react-redux";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";

// Combine all reducers
const rootReducer = combineReducers({
  quickViewReducer,
  cartReducer,
  wishlistReducer,
  productDetailsReducer,
});

// Persist config
const persistConfig = {
  key: "root", // Key in storage
  storage,
  whitelist: ["cartReducer"], // Add reducers to persist (e.g., only cartReducer)
};

// Apply persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore warnings for non-serializable values in state
    }),
});

// Persistor for Redux Persist
export const persistor = persistStore(store);

// Define types for use in app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
