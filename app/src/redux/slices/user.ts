import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "@services/UserService/UserService";

export const loadUser = createAsyncThunk<{ login: string, avatarUrl: string }>(
  "user/loadUser",
  async () => {
    return await UserService.GetUser();
  }
)

interface UserState {
  loaded: boolean;
  login: string | null;
  avatarUrl: string | null;
}

const initialState: UserState = {
  loaded: false,
  login: null,
  avatarUrl: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loaded = true;
        state.login = action.payload.login;
        state.avatarUrl = action.payload.avatarUrl;
      })
  }
});

export const { } = userSlice.actions;

export default userSlice.reducer;