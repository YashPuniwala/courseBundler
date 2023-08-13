import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import profileSlice from "./reducers/profileReducer"
import courseSlice from "./reducers/courseReducer"
import subscriptionSlice from "./reducers/subscriptionReducer"
import adminSlice from "./reducers/adminReducer"
import otherSlice from "./reducers/otherReducer"

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    course: courseSlice,
    subscription: subscriptionSlice,
    admin: adminSlice,
    other: otherSlice
  },
});

export default store;

export const server = 'http://localhost:4000/api/v1';
