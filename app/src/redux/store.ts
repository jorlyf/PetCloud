import { configureStore } from "@reduxjs/toolkit";

import auth from "./slices/auth";
import file from "./slices/file";
import createFolder from "./slices/createFolder"
import createFile from "./slices/createFile";

const store = configureStore({
  reducer: {
    auth,
    file,
    createFolder,
    createFile
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
