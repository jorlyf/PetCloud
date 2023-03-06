import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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