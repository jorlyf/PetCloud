import $api from "@http/api";
import UserDTO from "@entities/user/UserDTO";

export default class UserService {
  static async GetUser(): Promise<{ login: string; avatarUrl: string | null } | null> {
    const { data } = await $api.get<UserDTO>("/User/GetUser");
    return data;
  }
}