import store from "@redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FolderRetrievalService from "@services/FolderRetrievalService/FolderRetrievalService";
import FolderModel from "@entities/file/FolderModel";
import Vector2 from "@entities/common/Vector2";
import FileModel from "@entities/file/FileModel";
import { submitFolderCreation } from "./createFolder";
import { submitFileCreation } from "./createFile";
import { NotificationService } from "@notification/NotificationService";
import HierarchyRemovalService from "@services/HierarchyRemovalService/HierarchyRemovalService";

export const retrieveRootFolder = createAsyncThunk<{ root: FolderModel, login: string }>(
  "hierarchy/retrieveRootFolder",
  async () => {
    const rootFolder = await FolderRetrievalService.retrieveRoot();
    const login = store.getState().user.login;
    return { root: rootFolder, login };
  }
);

export const retrieveFolder = createAsyncThunk<FolderModel, string>(
  "hierarchy/retrieveFolder",
  async (folderId) => {
    const folder = await FolderRetrievalService.retrieveFolder(folderId);
    return folder;
  }
);

export const deleteFile = createAsyncThunk<string, string, { rejectValue: void }>(
  "hierarchy/deleteFile",
  async (fileId, { rejectWithValue }) => {
    try {
      await HierarchyRemovalService.deleteFile(fileId);
      return fileId;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const deleteFolder = createAsyncThunk<string, string, { rejectValue: void }>(
  "hierarchy/deleteFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      await HierarchyRemovalService.deleteFolder(folderId);
      return folderId;
    } catch (error) {
      return rejectWithValue();
    }
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

const hierarchySlice = createSlice({
  name: "hierarchy",
  initialState,
  reducers: {
    setRootFolder: (state, action: PayloadAction<FolderModel>) => {
      state.rootFolder = action.payload;
      state.openedFolderId = state.rootFolder.id;
    },
    openFolder: (state, action: PayloadAction<FolderModel>) => {
      state.openedFolderId = action.payload.id;
    },
    addFile: (state, action: PayloadAction<FileModel>) => {
      const parent = findFolderById(state.rootFolder, action.payload.folderId);
      parent.files.push(action.payload);
    },
    removeFile: (state, action: PayloadAction<FileModel>) => {
      const parentFolder = findFolderById(state.rootFolder, action.payload.folderId);
      if (!parentFolder) return;

      parentFolder.files = parentFolder.files.filter(f => f.id !== action.payload.id);
    },
    addFolder: (state, action: PayloadAction<FolderModel>) => {
      const parent = findFolderById(state.rootFolder, action.payload.parentId);
      parent.childFolders.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<FolderModel>) => {
      const parent = findFolderById(state.rootFolder, action.payload.parentId);
      parent.childFolders = parent.childFolders.filter(f => f.id !== action.payload.id);
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

      hierarchySlice.caseReducers.closeFileContextMenu(state);
    },
    closeFileAreaContexteMenu: (state) => {
      state.isOpenFileAreaContextMenu = false;
      state.fileAreaContextMenuPosition = null;
    },
    openFileContextMenu: (state, action: PayloadAction<{ fileId: string, position: Vector2 }>) => {
      state.isOpenFileContextMenu = true;
      state.fileContextMenuPosition = action.payload.position;
      state.contextMenuSelectedFileId = action.payload.fileId;

      hierarchySlice.caseReducers.closeFileAreaContexteMenu(state);
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
        if (parent) localFolder.path = `${parent.path}\\${localFolder.name}`;

        const files = action.payload.files;
        for (let i = 0; i < files.length; i++) {
          const serverFile = files[i]
          const localFile = findFileById(state.rootFolder, serverFile.id);
          if (localFile && localFile.folderId === serverFile.folderId) {
            localFile.name = serverFile.name;
            localFile.type = serverFile.type;
          } else {
            localFolder.files.push(serverFile);
          }
        }

        for (let i = 0; i < localFolder.files.length; i++) {
          const localFile = localFolder.files[i];
          const serverFile = files.find(f => f.id === localFile.id);
          if (!serverFile)
            localFolder.files = localFolder.files.filter(f => f.id !== localFile.id);
        }

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
          type: "hierarchy/setRootFolder"
        }
        hierarchySlice.caseReducers.setRootFolder(state, setRootAction);
      })
      .addCase(submitFolderCreation.fulfilled, (state, action) => {
        const addChildAction: PayloadAction<FolderModel> = {
          payload: action.payload,
          type: "hierarchy/addChildFolder"
        }
        hierarchySlice.caseReducers.addFolder(state, addChildAction);
        NotificationService.add("Папка успешно создана", "bottom-right", "success");
      })
      .addCase(submitFileCreation.fulfilled, (state, action) => {
        const addChildAction: PayloadAction<FileModel> = {
          payload: action.payload,
          type: "hierarchy/addChildFile"
        }
        hierarchySlice.caseReducers.addFile(state, addChildAction);
        NotificationService.add("Файл успешно создан", "bottom-right", "success");
      })
      .addCase(retrieveFolder.fulfilled, (state, action) => {
        const updateAction: PayloadAction<FolderModel> = {
          payload: action.payload,
          type: "hierarchy/updateFolder"
        }
        hierarchySlice.caseReducers.updateFolder(state, updateAction);
      })

      .addCase(deleteFile.fulfilled, (state, action) => {
        const file = findFileById(state.rootFolder, action.payload);
        if (file === null) return;

        const deleteFileAction: PayloadAction<FileModel> = {
          payload: file,
          type: "hierarchy/removeFile"
        }

        hierarchySlice.caseReducers.removeFile(state, deleteFileAction);
      })
      .addCase(deleteFile.rejected, (state) => {
        NotificationService.add("Произошла ошибка при удалении файла.", "bottom-right", "warning");
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        const folder = findFolderById(state.rootFolder, action.payload);
        if (folder === null) return;

        const deleteFolderAction: PayloadAction<FolderModel> = {
          payload: folder,
          type: "hierarchy/removeFolder"
        }

        hierarchySlice.caseReducers.removeFolder(state, deleteFolderAction);
      })
      .addCase(deleteFolder.rejected, (state) => {
        NotificationService.add("Произошла ошибка при удалении папки.", "bottom-right", "warning");
      })
  },
});

export const {
  setRootFolder,
  openFolder,
  addFile,
  addFolder,
  removeFolder,
  backToParentFolder,
  openFileAreaContextMenu,
  closeFileAreaContexteMenu,
  openFileContextMenu,
  closeFileContextMenu,
  openFile,
  closeFile
} = hierarchySlice.actions;

export default hierarchySlice.reducer;