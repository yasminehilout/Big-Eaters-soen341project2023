import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';
import profileReducer from '../features/counter/profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer
  },
});
