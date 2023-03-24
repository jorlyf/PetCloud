import $api from "@http/api";
import { AxiosRequestConfig } from "axios";

export default class FileUpdateService {
  static async UpdateTxtFileContent(fileId: string, content: string) {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "plain/text"
      }
    }
    await $api.post(`/File/UpdateTextFile?fileId=${fileId}`, content, config);
  }
}