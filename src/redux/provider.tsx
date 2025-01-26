"use client";

import { store, persistor } from "./store";
import { Provider } from "react-redux";
import React from "react";

import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "@/redux/store"; // Import store & persistor


export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>;
}
