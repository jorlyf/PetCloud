import FileModel from "@entities/file/FileModel";
import { NotificationService } from "@notification/NotificationService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FileHierarchyCreationService from "@services/FileHierarchyCreationService/FileHierarchyCreationService";

export const submitFileCreation = createAsyncThunk<FileModel, { folderId: string, fileName: string }, { rejectValue: string }>(
  "createFile/submitFileCreation",
  async ({ folderId, fileName }, { rejectWithValue }) => {
    try {
      return await FileHierarchyCreationService.createEmptyFile(folderId, fileName);
    } catch (error) {
      return rejectWithValue(error.response.data.Message);
    }
  }
);

interface CreateFileState {
  isOpenModal: boolean;
  fileName: string;
}

const initialState: CreateFileState = {
  isOpenModal: false,
  fileName: ""
}

const createFileSlice = createSlice({
  name: "createFile",
  initialState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    clear: (state) => {
      state.isOpenModal = false;
      state.fileName = "";
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(submitFileCreation.rejected, (state, action) => {
        NotificationService.add(action.payload, "bottom-right", "warning");
      })
});

export const {
  setIsOpenModal,
  setFileName,
  clear
} = createFileSlice.actions;

export default createFileSlice.reducer;