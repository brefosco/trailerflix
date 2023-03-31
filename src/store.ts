import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./slices/mediaSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
