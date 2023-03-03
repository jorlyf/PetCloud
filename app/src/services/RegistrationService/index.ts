import $api from "@http/api";
import LoginResponseDTO from "@entities/auth/dtos/LoginResponseDTO";
import LoginDataDTO from "@entities/auth/dtos/LoginDataDTO";

export default class RegistrationService {
  static async register(registrationData: LoginDataDTO): Promise<LoginResponseDTO> {
    const { data } = await $api.post<LoginResponseDTO>("/Registration", registrationData);
    return data;
  }
}