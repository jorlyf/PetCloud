import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const findConfirmDialog = (dialogs: ConfirmDialog[], id: string) => {
  const dialog = dialogs.find(x => x.id === id);
  return dialog ? dialog : null;
}

export interface ConfirmDialog {
  id: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ConfirmDialogsState {
  dialogs: ConfirmDialog[];
}

const initialState: ConfirmDialogsState = {
  dialogs: []
}

const confirmDialogsSlice = createSlice({
  name: "confirmDialogs",
  initialState,
  reducers: {
    addConfirmDialog: (state, action: PayloadAction<ConfirmDialog>) => {
      state.dialogs.push(action.payload);
    },
    deleteConfirmDialog: (state, action: PayloadAction<string>) => {
      state.dialogs = state.dialogs.filter(x => x.id !== action.payload);
    }
  }
});

export const {
  addConfirmDialog,
  deleteConfirmDialog
} = confirmDialogsSlice.actions;

export default confirmDialogsSlice.reducer;