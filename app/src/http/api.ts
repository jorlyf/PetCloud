import axios from "axios";
import LocalStorageService from "@services/LocalStorageService";

export enum NodeEnv {
  production = "production",
  development = "development"
}

export enum ResponseStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalError = 500
}

const getBaseUrl = () => {
  if (process.env.MODE === NodeEnv.production) {
    return "/api";
  } else {
    return "https://localhost:7115/api";
  }
}

export const BASE_URL = getBaseUrl();

const $api = axios.create({
  baseURL: BASE_URL
});

$api.interceptors.request.use(config => {
  config.headers!.Authorization = "Bearer " + LocalStorageService.getToken() || "";
  return config;
});

export default $api;