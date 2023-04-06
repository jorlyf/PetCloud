import store from "@redux/store";
import { retrieveFolder } from "./hierarchy";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FileUploadService from "@services/FileUploadService/FileUploadService";
import { NotificationService } from "@notification/NotificationService";

export const uploadFiles = createAsyncThunk<void, { folderId: string, files: File[] }>(
  "fileUpload/uploadFiles",
  async ({ folderId, files }) => {
    const handleUploadProgress = (progress: number) => {
      const action: PayloadAction<number> = {
        payload: progress,
        type: "fileUpload/setProgress"
      }
      store.dispatch(action);
    }

    await FileUploadService.uploadFiles(folderId, files, handleUploadProgress);
    await store.dispatch(retrieveFolder(folderId));
  }
)


interface FileUploadState {
  loading: boolean;
  progress: number;
}

const initialState: FileUploadState = {
  loading: false,
  progress: 0
}

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true;
        state.progress = 0;
      })
      .addCase(uploadFiles.fulfilled, (state) => {
        state.loading = false;
        NotificationService.add("Файлы успешно загружены.", "bottom-right", "success");
      })
      .addCase(uploadFiles.rejected, (state) => {
        state.loading = false;
        NotificationService.add("При загрузке файлов произошла ошибка.", "bottom-right", "danger");
      })
  }
});

export const { } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;