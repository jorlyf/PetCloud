import $api, { setupApiToken } from "@http/api";
import LoginDataDTO from "@entities/auth/dtos/LoginDataDTO";
import LoginResponseDTO from "@entities/auth/dtos/LoginResponseDTO";

export default class LoginService {
  static async login(loginData: LoginDataDTO): Promise<LoginResponseDTO> {
    const { data } = await $api.post<LoginResponseDTO>("/Login", loginData);
    return data;
  }

  static async tokenLogin(token: string): Promise<LoginResponseDTO> {
    setupApiToken(token);
    const { data } = await $api.post<LoginResponseDTO>("/Login/TokenLogin");
    return data;
  }
}