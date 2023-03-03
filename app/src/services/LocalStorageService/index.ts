enum ItemKey {
  token = "token"
}

export default class LocalStorageService {
  static getToken(): string | null {
    return localStorage.getItem(ItemKey.token);
  }

  static setToken(token: string) {
    localStorage.setItem(ItemKey.token, token);
  }

  static clearToken() {
    localStorage.removeItem(ItemKey.token);
  }
}