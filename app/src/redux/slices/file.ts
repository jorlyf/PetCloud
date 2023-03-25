import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FolderRetrievalService from "@services/FolderRetrievalService/FolderRetrievalService";
import FolderModel from "@entities/file/FolderModel";
import Vector2 from "@entities/common/Vector2";
import FileModel from "@entities/file/FileModel";
import { submitFolderCreation } from "./createFolder";
import { submitFileCreation } from "./createFile";
import store from "@redux/store";
import { NotificationService } from "@notification/NotificationService";

export const retrieveRootFolder = createAsyncThunk<{ root: FolderModel, login: string }>(
  "file/retrieveRootFolder",
  async () => {
    const rootFolder = await FolderRetrievalService.retrieveRoot();
    const login = store.getState().user.login;
    return { root: rootFolder, login };
  }
);

export const retrieveFolder = createAsyncThunk<FolderModel, string>(
  "file/retrieveFolder",
  async (folderId) => {
    const folder = await FolderRetrievalService.retrieveFolder(folderId);
    return folder;
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
export const findFileById = (root: FolderModel, id: string): FileModel | null => {
  if (root === null) return null;
  for (let i = 0; i < root.files.length; i++) {
    if (root.files[i].id === id) return root.files[i];
  }
  for (let i = 0; i < root.childFolders.length; i++) {
    const folder = root.childFolders[i];
    const result = findFileById(folder, id);
    if (result !== null) return result;
  }
  return null;
}

interface IFileState {
  openedFolderId: string | null;
  rootFolder: FolderModel | null;

  openedFileId: string | null;

  isOpenFileAreaContextMenu: boolean;
  fileAreaContextMenuPosition: Vector2 | null;

  isOpenFileContextMenu: boolean;
  fileContextMenuPosition: Vector2 | null;
  contextMenuSelectedFileId: string | null;
}

const initialState: IFileState = {
  openedFolderId: null,
  rootFolder: null,

  openedFileId: null,

  isOpenFileAreaContextMenu: false,
  fileAreaContextMenuPosition: null,

  isOpenFileContextMenu: false,
  fileContextMenuPosition: null,
  contextMenuSelectedFileId: null
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
    addChildFile: (state, action: PayloadAction<{ parentId: string, child: FileModel }>) => {
      const parent = findFolderById(state.rootFolder, action.payload.parentId);
      parent.files.push(action.payload.child);
    },
    addChildFolder: (state, action: PayloadAction<{ parentId: string, child: FolderModel }>) => {
      const parent = findFolderById(state.rootFolder, action.payload.parentId);
      parent.childFolders.push(action.payload.child);
    },
    removeChildFolder: (state, action: PayloadAction<{ parentId: string, child: FolderModel }>) => {
      const parent = findFolderById(state.rootFolder, action.payload.parentId);
      parent.childFolders = parent.childFolders.filter(f => f.id !== action.payload.child.id);
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
    openFileContextMenu: (state, action: PayloadAction<{ fileId: string, position: Vector2 }>) => {
      state.isOpenFileContextMenu = true;
      state.fileContextMenuPosition = action.payload.position;
      state.contextMenuSelectedFileId = action.payload.fileId;

      fileSlice.caseReducers.closeFileAreaContexteMenu(state);
    },
    closeFileContextMenu: (state) => {
      state.isOpenFileContextMenu = false;
      state.fileContextMenuPosition = null;
      state.contextMenuSelectedFileId = null;
    },
    updateFolder: (state, action: PayloadAction<FolderModel>) => {
      const localFolder = findFolderById(state.rootFolder, action.payload.id);
      if (!localFolder) {

      } else {
        localFolder.name = action.payload.name;
        const parent = findFolderById(state.rootFolder, action.payload.parentId);
        if (parent) localFolder.path = `${parent.path}\\${action.payload.name}`;

        for (let i = 0; i < action.payload.childFolders.length; i++) {
          const serverChildFolder = action.payload.childFolders[i];
          const localChildFolder = findFolderById(state.rootFolder, serverChildFolder.id);
          if (!localChildFolder) {
            localFolder.childFolders.push(serverChildFolder);
          } else {

          }
        }
      }
    },
    openFile: (state, action: PayloadAction<FileModel>) => {
      state.openedFileId = action.payload.id;
    },
    closeFile: (state) => {
      state.openedFileId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveRootFolder.fulfilled, (state, action) => {
        action.payload.root.path = `${action.payload.login}\\Root`;
        const setRootAction: PayloadAction<FolderModel> = {
          payload: action.payload.root,
          type: "file/setRootFolder"
        }
        fileSlice.caseReducers.setRootFolder(state, setRootAction);
      })
      .addCase(submitFolderCreation.fulfilled, (state, action) => {
        const addChildAction: PayloadAction<{ parentId: string, child: FolderModel }> = {
          payload: {
            parentId: action.payload.parentId,
            child: action.payload
          },
          type: "file/addChildFolder"
        }
        fileSlice.caseReducers.addChildFolder(state, addChildAction);
        NotificationService.add("Папка успешно создана", "bottom-right", "success");
      })
      .addCase(submitFileCreation.fulfilled, (state, action) => {
        const addChildAction: PayloadAction<{ parentId: string, child: FileModel }> = {
          payload: {
            parentId: action.payload.folderId,
            child: action.payload
          },
          type: "file/addChildFile"
        }
        fileSlice.caseReducers.addChildFile(state, addChildAction);
        NotificationService.add("Файл успешно создан", "bottom-right", "success");
      })
      .addCase(retrieveFolder.fulfilled, (state, action) => {
        const updateAction: PayloadAction<FolderModel> = {
          payload: action.payload,
          type: "file/updateFolder"
        }
        fileSlice.caseReducers.updateFolder(state, updateAction);
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
  closeFileContextMenu,
  openFile,
  closeFile
} = fileSlice.actions;

export default fileSlice.reducer;