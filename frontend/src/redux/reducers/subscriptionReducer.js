import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  subscriptionId: null,
  message: null,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    buySubscriptionRequest: (state, action) => {
      state.loading = true;
    },
    buySubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.subscriptionId = action.payload;
    },
    buySubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    buySubscriptionReset: (state) => {
      state.loading = false;
      state.error = null;
    },


    cancelSubscriptionRequest: (state, action) => {
      state.loading = true;
    },
    cancelSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    cancelSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelSubscriptionReset: (state) => {
      state.loading = false;
      state.error = null;
    },

    clearError: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearMessage: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});


export const {
  buySubscriptionRequest,
  buySubscriptionSuccess,
  buySubscriptionFail,
  buySubscriptionReset,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail,
  cancelSubscriptionReset,
  clearError,
  clearMessage,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
