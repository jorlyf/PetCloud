import { configureStore } from "@reduxjs/toolkit";

import auth from "./slices/auth";
import file from "./slices/file";
import user from "./slices/user";
import createFolder from "./slices/createFolder"
import createFile from "./slices/createFile";

const store = configureStore({
  reducer: {
    auth,
    file,
    user,
    createFolder,
    createFile
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
