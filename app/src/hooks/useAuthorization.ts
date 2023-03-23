import * as React from "react";
import { useNavigate } from "react-router";
import { setWasInitAuthAttempt, tokenLogin } from "@redux/slices/auth";
import { setupApiToken } from "@http/api";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import LocalStorageService from "@services/LocalStorageService";
import { RoutingURL } from "../Routing";
import { loadUser } from "@redux/slices/user";

const useAuthorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authState = useAppSelector(state => state.auth);
  const userStateLoaded = useAppSelector(state => state.user.loaded);

  React.useEffect(() => {
    if (authState.wasInitLoginAttempt || authState.isLogging) return;

    const token = LocalStorageService.getToken();
    if (token) {
      dispatch(tokenLogin(token));
    } else {
      dispatch(setWasInitAuthAttempt(true));
    }

  }, [authState.wasInitLoginAttempt, authState.isLogging, dispatch]);

  React.useEffect(() => {
    if (authState.wasInitLoginAttempt) {
      authState.token ? LocalStorageService.setToken(authState.token) : LocalStorageService.clearToken();
      setupApiToken(authState.token);
    }
  }, [authState.token]);

  React.useEffect(() => {
    if (!authState.isAuthorized) {
      navigate(RoutingURL.authorization);
    }
  }, [navigate, authState.isAuthorized]);

  React.useEffect(() => {
    if (authState.isAuthorized && !userStateLoaded) {
      dispatch(loadUser());
    }
  }, [dispatch, authState.isAuthorized]);

}
export default useAuthorization;
