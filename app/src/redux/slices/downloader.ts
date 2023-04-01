import store from "@redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findFileById } from "./file";
import FileDownloaderService from "@services/FileDownloaderService/FileDownloaderService";

const isExistDownloadItem = (items: IDownloadItem[], id: string): boolean => {
  return items.find(x => x.id === id) !== undefined;
}

export const downloadFile = createAsyncThunk<string, string, { rejectValue: string }>(
  "downloader/downloadItem",
  async (fileId, { rejectWithValue, signal }) => {
    const fileState = store.getState().file;
    const file = findFileById(fileState.rootFolder, fileId);
    if (!file) return;

    if (isExistDownloadItem(store.getState().downloader.items, fileId)) {
      return;
    }

    const onProgress = (progress: number) => {
      const action: PayloadAction<{ id: string, progress: number }> = {
        payload: { id: fileId, progress },
        type: "downloader/updateDownloadItemProgress"
      }
      store.dispatch(action);
    }

    const createDownloadItemAction: PayloadAction<{ id: string, name: string }> = {
      payload: { id: file.id, name: file.name },
      type: "downloader/createDownloadItem"
    }
    store.dispatch(createDownloadItemAction);

    try {
      await FileDownloaderService.saveFile(file.id, file.name, onProgress, signal);
      return file.id;
    } catch (error) {
      return rejectWithValue(file.id);
    }
  }
);

export const downloadFolder = createAsyncThunk<void, string>(
  "downloader/downloadItem",
  async (folderId) => {

  }
);

export interface IDownloadItem {
  id: string;
  name: string;
  progress: number;
  loaded: boolean;
  error: boolean;

  promise: any | null;
}

interface IDownloaderState {
  items: IDownloadItem[]
}

const initialState: IDownloaderState = {
  items: []
}

const downloaderSlice = createSlice({
  name: "downloader",
  initialState,
  reducers: {
    updateDownloadItemProgress(state, action: PayloadAction<{ id: string, progress: number }>) {
      const item = state.items.find(x => x.id === action.payload.id);
      if (!item) return;

      item.progress = action.payload.progress;
    },
    createDownloadItem(state, action: PayloadAction<{ id: string, name: string }>) {
      const item: IDownloadItem = {
        id: action.payload.id,
        name: action.payload.name,
        progress: 0,
        loaded: false,
        error: false,
        promise: null
      }
      state.items.push(item);
    },
    removeDownloadItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(x => x.id !== action.payload);
    },
    abortDownloadItem(state, action: PayloadAction<string>) {
      const item = state.items.find(x => x.id === action.payload);
      if (!item) return;

      if (item.promise === null) return;
      item.promise.abort();

      state.items = state.items.filter(x => x.id !== action.payload);
    },
    setDownloadItemPromise(state, action: PayloadAction<{ id: string, promise: Promise<any> }>) {
      const item = state.items.find(x => x.id === action.payload.id);
      if (!item) return;
      item.promise = action.payload.promise;
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(downloadFile.fulfilled, (state, action) => {
        const item = state.items.find(x => x.id === action.payload);
        if (!item) return;
        item.loaded = true;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        const item = state.items.find(x => x.id === action.meta.arg);
        // не знаю почему, но file.id помещается не в payload, а в meta.arg

        if (!item) return;
        item.error = true;
      })
  }
});

export const {
  abortDownloadItem,
  removeDownloadItem,
  setDownloadItemPromise
} = downloaderSlice.actions;

export default downloaderSlice.reducer;