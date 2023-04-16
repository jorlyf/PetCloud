import { configureStore } from "@reduxjs/toolkit";

import auth from "./slices/auth";
import hierarchy from "./slices/hierarchy";
import user from "./slices/user";
import createFolder from "./slices/createFolder"
import createFile from "./slices/createFile";
import openedFile from "./slices/openedFile";
import fileUpload from "./slices/fileUpload";
import hierarchyDownloader from "./slices/hierarchyDownloader";
import hierarchyCut from "./slices/hieararchyCut";
import confirmDialogs from "./slices/confirmDialogs";

const store = configureStore({
  reducer: {
    auth,
    hierarchy,
    user,
    createFolder,
    createFile,
    openedFile,
    fileUpload,
    hierarchyDownloader,
    hierarchyCut,
    confirmDialogs
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
