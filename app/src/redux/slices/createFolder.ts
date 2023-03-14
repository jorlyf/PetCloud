import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FileHierarchyCreationService from "@services/FileHierarchyCreationService/FileHierarchyCreationService";
import FolderModel from "@entities/file/FolderModel";

export const submitFolderCreation = createAsyncThunk<FolderModel, { parentFolderId: string, folderName: string }>(
  "createFolder/submitFolderCreation",
  async ({ parentFolderId, folderName }) => {
    return FileHierarchyCreationService.createEmptyFolder(parentFolderId, folderName);
  }
)

interface CreateFolderState {
  isOpenModal: boolean;
  folderName: string;
}

const initialState: CreateFolderState = {
  isOpenModal: false,
  folderName: ""
}

const createFolderSlice = createSlice({
  name: "createFolder",
  initialState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setFolderName: (state, action: PayloadAction<string>) => {
      state.folderName = action.payload;
    },
    clear: (state) => {
      state.isOpenModal = false;
      state.folderName = "";
    }
  }
});

export const {
  setIsOpenModal,
  setFolderName,
  clear
} = createFolderSlice.actions;

export default createFolderSlice.reducer;