import { configureStore, combineReducers } from '@reduxjs/toolkit';
import clientReducer from './client/clientSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import officerReducer from './officer/officerSlice.js';
import agentReducer from './agent/agentSlice.js';

import storage from 'redux-persist/lib/storage';
import cartReducer from "./cart/cartSlice.js"
 
//redux persis is used internally to remember user data , redux alone cant do it on refresh the user data is cleared


// Combine reducers
const rootReducer = combineReducers({
  client: clientReducer,
  officer:officerReducer,
  agent:agentReducer,
  cart: cartReducer,
 
});

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure persistor
export const persistor = persistStore(store);
