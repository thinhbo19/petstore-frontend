import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "Notification",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const { notification, href, status = false, id } = action.payload;
      state.notifications.push({ notification, href, status, id });
    },
    markAsRead: (state, action) => {
      const { index } = action.payload;
      if (state.notifications[index]) {
        state.notifications[index].status = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.status = true;
      });
    },
    removeNotification: (state, action) => {
      const { index } = action.payload;
      state.notifications.splice(index, 1);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export const selectNotification = (state) => {
  return state.notification.notifications;
};
export default notificationSlice.reducer;
