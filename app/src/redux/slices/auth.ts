import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LoginService from "@services/LoginService";
import RegistrationService from "@services/RegistrationService";
import LocalStorageService from "@services/LocalStorageService";
import LoginDataDTO from "@entities/auth/dtos/LoginDataDTO";
import LoginResponseDTO from "@entities/auth/dtos/LoginResponseDTO";

export const login = createAsyncThunk<LoginResponseDTO, LoginDataDTO>(
  "auth/login",
  async (loginData) => {
    const loginResponse = await LoginService.login(loginData);
    return loginResponse;
  }
);

export const tokenLogin = createAsyncThunk<LoginResponseDTO>(
  "auth/login",
  async () => {
    const loginResponse = await LoginService.tokenLogin();
    return loginResponse;
  }
);

export const register = createAsyncThunk<LoginResponseDTO, LoginDataDTO>(
  "auth/login",
  async (registrationData) => {
    const registrationResponse = await RegistrationService.register(registrationData);
    return registrationResponse;
  }
);

interface AuthState {
  token: string | null;
  isAuthorized: boolean;
  isLogging: boolean;
  wasInitLoginAttempt: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthorized: false,
  isLogging: false,
  wasInitLoginAttempt: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogging = false;
      state.isAuthorized = false;
      state.wasInitLoginAttempt = true;

      state.token = null;
      LocalStorageService.clearToken();
    },
    setWasInitAuthAttempt(state, action: PayloadAction<boolean>) {
      state.wasInitLoginAttempt = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLogging = true;
        state.isAuthorized = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogging = false;
        state.isAuthorized = true;
        state.wasInitLoginAttempt = true;

        state.token = action.payload.token;
        LocalStorageService.setToken(action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.isLogging = false;
        state.isAuthorized = false;
        state.wasInitLoginAttempt = true;

        state.token = null;
        LocalStorageService.clearToken();
      })
  }
});

export const { logout, setWasInitAuthAttempt } = authSlice.actions;

export default authSlice.reducer;