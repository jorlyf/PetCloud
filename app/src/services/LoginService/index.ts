import $api from "@http/api";
import LoginDataDTO from "@entities/auth/dtos/LoginDataDTO";
import LoginResponseDTO from "@entities/auth/dtos/LoginResponseDTO";

export default class LoginService {
  static async login(loginData: LoginDataDTO): Promise<LoginResponseDTO> {
    const { data } = await $api.post<LoginResponseDTO>("/Login", loginData);
    return data;
  }

  static async tokenLogin(): Promise<LoginResponseDTO> {
    const { data } = await $api.post<LoginResponseDTO>("/Login/TokenLogin");
    return data;
  }
}