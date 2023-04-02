import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FileHierarchyCreationService from "@services/FileHierarchyCreationService/FileHierarchyCreationService";
import FolderModel from "@entities/file/FolderModel";
import { NotificationService } from "@notification/NotificationService";

export const submitFolderCreation = createAsyncThunk<FolderModel, { parentFolderId: string, folderName: string }, { rejectValue: string }>(
  "createFolder/submitFolderCreation",
  async ({ parentFolderId, folderName }, { rejectWithValue }) => {
    try {
      return await FileHierarchyCreationService.createEmptyFolder(parentFolderId, folderName);
    } catch (error) {
      return rejectWithValue(error.response.data.Message);
    }
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
      .addCase(submitFolderCreation.rejected, (state, action) => {
        NotificationService.add(action.payload, "bottom-right", "warning");
      })
});

export const {
  setIsOpenModal,
  setFolderName,
  clear
} = createFolderSlice.actions;

export default createFolderSlice.reducer;