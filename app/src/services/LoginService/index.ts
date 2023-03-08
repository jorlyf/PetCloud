import $api, { setupApiToken } from "@http/api";
import LoginDataDTO from "@entities/auth/dtos/LoginDataDTO";
import LoginResponseDTO from "@entities/auth/dtos/LoginResponseDTO";

export default class LoginService {
  static async login(loginData: LoginDataDTO): Promise<LoginResponseDTO> {
    const { data } = await $api.post<LoginResponseDTO>("/Authorization/Login", loginData);
    return data;
  }

  static async tokenLogin(token: string): Promise<void> {
    setupApiToken(token);
    return await $api.post("/Authorization/TokenLogin");
  }
}