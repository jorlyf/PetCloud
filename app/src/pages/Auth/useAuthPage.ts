import * as React from "react";
import { useNavigate } from "react-router";
import { login, register } from "@redux/slices/auth";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import LoginDataDTO from "@entities/auth/dtos/LoginDataDTO";

export enum AuthMode {
  login,
  registrate
}

const useAuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = React.useState<AuthMode>(AuthMode.login);

  const [loginInput, setLoginInput] = React.useState<string>("");
  const [passwordInput, setPasswordInput] = React.useState<string>("");

  const isLogging = useAppSelector(state => state.auth.isLogging);
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const wasInitLoginAttempt = useAppSelector(state => state.auth.wasInitLoginAttempt);

  const clearInputs = () => {
    setLoginInput("");
    setPasswordInput("");
  }

  const handleChangeMode = (newMode: AuthMode) => {
    setAuthMode(newMode);
  }

  const handleSubmitLogin = () => {
    const loginData: LoginDataDTO = { login: loginInput, password: passwordInput }
    dispatch(login(loginData));

  }

  const handleSubmitRegister = async () => {
    const registrationData: LoginDataDTO = { login: loginInput, password: passwordInput }
    dispatch(register(registrationData));
  }

  React.useEffect(() => {
    if (isAuthorized) { navigate("/"); }
  }, [isAuthorized, navigate]);

  return {
    authMode,
    wasInitLoginAttempt,
    isAuthorized,
    isLogging,
    loginInput,
    setLoginInput,
    passwordInput,
    setPasswordInput,
    handleChangeMode,
    handleSubmitLogin,
    handleSubmitRegister
  }
}

export default useAuthPage;