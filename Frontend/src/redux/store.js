import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/userSlice.js';
import messageReducer from './features/messageSlice.js';

// Custom Transform to Reset selectedUsers on Rehydrate
const resetSelectedUsersTransform = createTransform(
  inboundState => inboundState, // Save state as is
  outboundState => ({
    ...outboundState,
    selectedUsers: null // Reset selectedUsers on rehydration
  }),
  { whitelist: ['user'] } // Only apply this transform to 'user' slice
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [resetSelectedUsersTransform] // Apply transform
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export default store;
