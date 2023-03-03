import { configureStore } from "@reduxjs/toolkit";

import auth from "./slices/auth";
import file from "./slices/file";

const store = configureStore({
  reducer: {
    auth,
    file
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
