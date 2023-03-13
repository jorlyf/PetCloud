import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FileHierarchyCreationService from "@services/FileHierarchyCreationService/FileHierarchyCreationService";
import FolderModel from "@entities/file/FolderModel";

const submitFolderCreating = createAsyncThunk<FolderModel, { parentFolderId: string, folderName: string }>(
  "createFolder/submitFolderCreating",
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
  },
  extraReducers: (builder) =>
    builder
      .addCase(submitFolderCreating.fulfilled, (state, action) => {
        
      })
});

export const {
  setIsOpenModal,
  setFolderName,
  clear
} = createFolderSlice.actions;

export default createFolderSlice.reducer;