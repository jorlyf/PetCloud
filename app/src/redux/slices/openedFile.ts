import store from "@redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store as NotificationStore } from "react-notifications-component";
import FileRetrievalService from "@services/FileRetrievalService/FileRetrievalService";
import FileUpdateService from "@services/FileUpdateService/FileUpdateService";

export const loadFileContent = createAsyncThunk<void, string>(
  "openedFile/loadFileContent",
  async (fileId) => {
    await FileRetrievalService.retrieveFileContent(fileId, (result) => {
      store.dispatch({
        type: "openedFile/setContent",
        payload: result
      });
    });
  }
)

export const updateTxtFileContent = createAsyncThunk<void, { fileId: string, content: string }>(
  "openedFile/updateTxtFileContent",
  async ({ fileId, content }) => {
    await FileUpdateService.UpdateTxtFileContent(fileId, content);
  }
)

interface OpenedFileState {
  loaded: boolean;
  content: ArrayBuffer | null;
}

const initialState: OpenedFileState = {
  loaded: false,
  content: null,
}

const openedFileSlice = createSlice({
  name: "openedFile",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<ArrayBuffer>) => {
      state.loaded = true;
      state.content = action.payload;
    },
    clearContent: (state) => {
      state.loaded = false;
      state.content = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTxtFileContent.fulfilled, () => {
        NotificationStore.addNotification({
          container: "bottom-right",
          message: "Сохранено",
          type: "success",
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
      })
  }
});

export const { clearContent } = openedFileSlice.actions;

export default openedFileSlice.reducer;