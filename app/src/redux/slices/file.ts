import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FolderModel from "@entities/file/FolderModel";
import Vector2 from "@entities/common/Vector2";
import FileModel from "@entities/file/FileModel";

export const findFolderByPath = (root: FolderModel, path: string): FolderModel | null => {
  if (root == null) return null;
  if (root.path === path) return root;
  for (let i = 0; i < root.childFolders.length; i++) {
    const folder = root.childFolders[i];
    if (path === folder.path) return folder;
    const result = findFolderByPath(folder, path);
    if (result !== null) return result;
  }
  return null;
}

interface IFileState {
  openedFolderPath: string | null;
  rootFolder: FolderModel | null;

  isOpenFileAreaContextMenu: boolean;
  fileAreaContextMenuPosition: Vector2 | null;

  isOpenFileContextMenu: boolean;
  fileContextMenuPosition: Vector2 | null;
  selectedFilePathContextMenu: string | null;
}

const initialState: IFileState = {
  openedFolderPath: null,
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
      state.openedFolderPath = state.rootFolder.path;
    },
    openFolder: (state, action: PayloadAction<FolderModel>) => {
      state.openedFolderPath = action.payload.path;
    },
    addChildFile: (state, action: PayloadAction<FileModel>) => {
      const openedFolder = findFolderByPath(state.rootFolder, state.openedFolderPath);
      openedFolder.childFiles.push(action.payload);
    },
    addChildFolder: (state, action: PayloadAction<FolderModel>) => {
      const openedFolder = findFolderByPath(state.rootFolder, state.openedFolderPath);
      openedFolder.childFolders.push(action.payload);
    },
    removeChildFolder: (state, action: PayloadAction<FolderModel>) => {
      const openedFolder = findFolderByPath(state.rootFolder, state.openedFolderPath);
      openedFolder.childFolders = openedFolder.childFolders.filter(f => f !== action.payload);
    },
    backToParentFolder: (state) => {
      const openedFolder = findFolderByPath(state.rootFolder, state.openedFolderPath);
      if (openedFolder.path === state.rootFolder.path) return;
      const folder = findFolderByPath(state.rootFolder, openedFolder.parentPath);
      state.openedFolderPath = folder.path;
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
    openFileContextMenu: (state, action: PayloadAction<{filePath: string, position: Vector2}>) => {
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
  }
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