import store from "@redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findFileById, findFolderById } from "./hierarchy";
import DownloaderService from "@services/DownloaderService/DownloaderService";

const isExistDownloadItem = (items: IDownloadItem[], id: string): boolean => {
  return items.find(x => x.id === id) !== undefined;
}

export const downloadFile = createAsyncThunk<string, string, { rejectValue: string }>(
  "hierarchyDownloader/downloadItem",
  async (fileId, { rejectWithValue, signal }) => {
    const fileState = store.getState().hierarchy;
    const file = findFileById(fileState.rootFolder, fileId);
    if (!file) return;

    if (isExistDownloadItem(store.getState().hierarchyDownloader.items, file.id)) {
      return;
    }

    const onProgress = (progress: number) => {
      const action: PayloadAction<{ id: string, progress: number }> = {
        payload: { id: file.id, progress },
        type: "hierarchyDownloader/updateDownloadItemProgress"
      }
      store.dispatch(action);
    }

    const createDownloadItemAction: PayloadAction<{ id: string, name: string }> = {
      payload: { id: file.id, name: file.name },
      type: "hierarchyDownloader/createDownloadItem"
    }
    store.dispatch(createDownloadItemAction);

    try {
      await DownloaderService.saveFile(file.id, file.name, onProgress, signal);
      return file.id;
    } catch (error) {
      return rejectWithValue(file.id);
    }
  }
);

export const downloadFolder = createAsyncThunk<string, string, { rejectValue: string }>(
  "hierarchyDownloader/downloadItem",
  async (folderId, { rejectWithValue, signal }) => {
    const fileState = store.getState().hierarchy;
    const folder = findFolderById(fileState.rootFolder, folderId);
    if (!folder) return;

    if (isExistDownloadItem(store.getState().hierarchyDownloader.items, folder.id)) {
      return;
    }

    const onProgress = (progress: number) => {
      const action: PayloadAction<{ id: string, progress: number }> = {
        payload: { id: folder.id, progress },
        type: "hierarchyDownloader/updateDownloadItemProgress"
      }
      store.dispatch(action);
    }

    const createDownloadItemAction: PayloadAction<{ id: string, name: string }> = {
      payload: { id: folder.id, name: folder.name },
      type: "hierarchyDownloader/createDownloadItem"
    }
    store.dispatch(createDownloadItemAction);

    try {
      await DownloaderService.saveFolder(folder.id, folder.name, onProgress, signal);
      return folder.id;
    } catch (error) {
      return rejectWithValue(folder.id);
    }
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

const hierarchyDownloaderSlice = createSlice({
  name: "hierarchyDownloader",
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
} = hierarchyDownloaderSlice.actions;

export default hierarchyDownloaderSlice.reducer;