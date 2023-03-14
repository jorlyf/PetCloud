import FileModel from "@entities/file/FileModel";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FileHierarchyCreationService from "@services/FileHierarchyCreationService/FileHierarchyCreationService";

export const submitFileCreation = createAsyncThunk<FileModel, { folderId: string, fileName: string }>(
  "createFile/submitFileCreation",
  async ({ folderId, fileName }) => {
    return FileHierarchyCreationService.createEmptyFile(folderId, fileName);
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
  }
});

export const {
  setIsOpenModal,
  setFileName,
  clear
} = createFileSlice.actions;

export default createFileSlice.reducer;