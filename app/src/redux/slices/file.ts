import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FolderModel from "@entities/file/FolderModel";

const findFolderByPath = (root: FolderModel, path: string): FolderModel | null => {
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
  openedFolder: FolderModel | null;
  rootFolder: FolderModel | null;
}

const initialState: IFileState = {
  openedFolder: null,
  rootFolder: null
}

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setRootFolder: (state, action: PayloadAction<FolderModel>) => {
      state.rootFolder = action.payload;
      state.openedFolder = state.rootFolder;
    },
    openFolder: (state, action: PayloadAction<FolderModel>) => {
      state.openedFolder = action.payload;
    },
    addChildFolder: (state, action: PayloadAction<FolderModel>) => {
      state.openedFolder.childFolders.push(action.payload);
    },
    removeChildFolder: (state, action: PayloadAction<FolderModel>) => {
      state.openedFolder.childFolders = state.openedFolder.childFolders.filter(f => f !== action.payload);
    },
    backToParentFolder: (state) => {    
      if (state.openedFolder.path === state.rootFolder.path) return;
      const folder = findFolderByPath(state.rootFolder, state.openedFolder.parentPath);
      state.openedFolder = folder;
    }
  }
});

export const {
  setRootFolder,
  openFolder,
  addChildFolder,
  removeChildFolder,
  backToParentFolder
} = fileSlice.actions;

export default fileSlice.reducer;