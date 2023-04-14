import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';
import profileReducer from '../features/counter/profileSlice';

/* This code is creating a Redux store using the `configureStore` function from the `@reduxjs/toolkit`
library. The store is being configured with two reducers: `userReducer` and `profileReducer`, which
are combined using the `reducer` property. The resulting store is then exported as a constant named
`store`, which can be used to access the state and dispatch actions throughout the application. */
export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer
  },
});
