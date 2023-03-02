import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  notification: { text: "", severity: "" },
  status: "idle",
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationDisplayed: (state, action) => {
      state.notification = action.payload.notification;
    },
    notificationClosed: (state, action) => {
      state.notification = { text: "", severity: "" };
    },
  },
});

export const { notificationClosed, notificationDisplayed } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
export const selectNotifications = (state) => state.notifications.notification;
