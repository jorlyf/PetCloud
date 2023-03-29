import store from "@redux/store";
import { findFileById } from "./file";
import { createAsyncThunk } from "@reduxjs/toolkit";
import FileDownloaderService from "@services/FileDownloaderService/FileDownloaderService";

export const downloadFile = createAsyncThunk<void, string>(
  "downloader/downloadFile",
  async (fileId) => {
    const fileState = store.getState().file;
    const file = findFileById(fileState.rootFolder, fileId);
    if (!file) return;

    await FileDownloaderService.saveFile(fileId, file.name);
  }
);

export const downloadFolder = createAsyncThunk<void, string>(
  "downloader/downloadFolder",
  async (folderId) => {
    
  }
)