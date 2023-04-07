import store from "@redux/store";
import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HierarchyMovingService from "@services/HierarchyMovingService/HierarchyMovingService";
import { NotificationService } from "@notification/NotificationService";
import { retrieveFolder } from "./hierarchy";

export const moveFile = createAsyncThunk<void, { fileId: string, targetFolderId: string }>(
  "hierarchyCut/moveFile",
  async ({ fileId, targetFolderId }, { rejectWithValue }) => {
    const clearCutted: Action = {
      type: "hierarchyCut/clearCutted"
    }
    store.dispatch(clearCutted);

    try {
      await HierarchyMovingService.moveFile(fileId, targetFolderId);
      store.dispatch(retrieveFolder(targetFolderId));
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

export const moveFolder = createAsyncThunk<void, { folderId: string, targetFolderId: string }>(
  "hierarchyCut/moveFolder",
  async ({ folderId, targetFolderId }, { rejectWithValue }) => {
    const clearCuttedAction: Action = {
      type: "hierarchyCut/clearCutted"
    }
    store.dispatch(clearCuttedAction);

    try {
      await HierarchyMovingService.moveFolder(folderId, targetFolderId);
      store.dispatch(retrieveFolder(targetFolderId));
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

interface HierarchyCutState {
  cuttedFileId: string | null;
  cuttedFolderId: string | null;
}

const initialState: HierarchyCutState = {
  cuttedFileId: null,
  cuttedFolderId: null
}

const hierarchyCutSlice = createSlice({
  name: "hierarchyCut",
  initialState,
  reducers: {
    clearCutted: (state) => {
      state.cuttedFileId = null;
      state.cuttedFolderId = null;
    },
    setCuttedFile: (state, action: PayloadAction<string>) => {
      state.cuttedFileId = action.payload;
      state.cuttedFolderId = null;
    },
    setCuttedFolder: (state, action: PayloadAction<string>) => {
      state.cuttedFileId = null;
      state.cuttedFolderId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(moveFile.rejected, (state) => {
        NotificationService.add("Произошла ошибка при перемещении файла", "bottom-right", "warning");
      })
      .addCase(moveFolder.rejected, (state) => {
        NotificationService.add("Произошла ошибка при перемещении папки", "bottom-right", "warning");
      })
  }
});

export const { setCuttedFile, setCuttedFolder } = hierarchyCutSlice.actions;

export default hierarchyCutSlice.reducer;