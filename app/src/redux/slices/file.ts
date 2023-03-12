import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FolderRetrievalService from "@services/FolderRetrievalService/FolderRetrievalService";
import FolderModel from "@entities/file/FolderModel";
import Vector2 from "@entities/common/Vector2";
import FileModel from "@entities/file/FileModel";

export const loadRootFolder = createAsyncThunk<FolderModel>(
  "file/loadRootFolder",
  async () => {
    const rootFolder = await FolderRetrievalService.retrieveRoot();
    return rootFolder;
  }
);

export const findFolderById = (root: FolderModel, id: string): FolderModel | null => {
  if (root === null) return null;
  if (root.id === id) return root;
  for (let i = 0; i < root.childFolders.length; i++) {
    const folder = root.childFolders[i];
    if (id === folder.id) return folder;
    const result = findFolderById(folder, id);
    if (result !== null) return result;
  }
  return null;
}

interface IFileState {
  openedFolderId: string | null;
  rootFolder: FolderModel | null;

  isOpenFileAreaContextMenu: boolean;
  fileAreaContextMenuPosition: Vector2 | null;

  isOpenFileContextMenu: boolean;
  fileContextMenuPosition: Vector2 | null;
  selectedFilePathContextMenu: string | null;
}

const initialState: IFileState = {
  openedFolderId: null,
  rootFolder: null,

  isOpenFileAreaContextMenu: false,
  fileAreaContextMenuPosition: null,

  isOpenFileContextMenu: false,
  fileContextMenuPosition: null,
  selectedFilePathContextMenu: null
}

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setRootFolder: (state, action: PayloadAction<FolderModel>) => {
      state.rootFolder = action.payload;
      state.openedFolderId = state.rootFolder.id;
    },
    openFolder: (state, action: PayloadAction<FolderModel>) => {
      state.openedFolderId = action.payload.id;
    },
    addChildFile: (state, action: PayloadAction<FileModel>) => {
      const openedFolder = findFolderById(state.rootFolder, state.openedFolderId);
      openedFolder.files.push(action.payload);
    },
    addChildFolder: (state, action: PayloadAction<FolderModel>) => {
      const openedFolder = findFolderById(state.rootFolder, state.openedFolderId);
      openedFolder.childFolders.push(action.payload);
    },
    removeChildFolder: (state, action: PayloadAction<FolderModel>) => {
      const openedFolder = findFolderById(state.rootFolder, state.openedFolderId);
      openedFolder.childFolders = openedFolder.childFolders.filter(f => f !== action.payload);
    },
    backToParentFolder: (state) => {
      const openedFolder = findFolderById(state.rootFolder, state.openedFolderId);
      if (openedFolder.id === state.rootFolder.id) return;
      const folder = findFolderById(state.rootFolder, openedFolder.parentId);
      state.openedFolderId = folder.id;
    },
    openFileAreaContextMenu: (state, action: PayloadAction<Vector2>) => {
      state.isOpenFileAreaContextMenu = true;
      state.fileAreaContextMenuPosition = action.payload;

      fileSlice.caseReducers.closeFileContextMenu(state);
    },
    closeFileAreaContexteMenu: (state) => {
      state.isOpenFileAreaContextMenu = false;
      state.fileAreaContextMenuPosition = null;
    },
    openFileContextMenu: (state, action: PayloadAction<{ filePath: string, position: Vector2 }>) => {
      state.isOpenFileContextMenu = true;
      state.fileContextMenuPosition = action.payload.position;
      state.selectedFilePathContextMenu = action.payload.filePath;

      fileSlice.caseReducers.closeFileAreaContexteMenu(state);
    },
    closeFileContextMenu: (state) => {
      state.isOpenFileContextMenu = false;
      state.fileContextMenuPosition = null;
      state.selectedFilePathContextMenu = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRootFolder.pending, (state) => {
        
      })
      .addCase(loadRootFolder.fulfilled, (state, action) => {
        fileSlice.caseReducers.setRootFolder(state, action);
      })
      .addCase(loadRootFolder.rejected, (state) => {
        
      })
  },
});

export const {
  setRootFolder,
  openFolder,
  addChildFile,
  addChildFolder,
  removeChildFolder,
  backToParentFolder,
  openFileAreaContextMenu,
  closeFileAreaContexteMenu,
  openFileContextMenu,
  closeFileContextMenu
} = fileSlice.actions;

export default fileSlice.reducer;