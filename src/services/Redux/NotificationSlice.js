import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "Notification",
  initialState: {
    notifications: [],
  },
  reducers: {},
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
