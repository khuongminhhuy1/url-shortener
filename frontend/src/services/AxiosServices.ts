import axios from "axios";
import { API_SERVER_URL } from "../constants";

class AxiosService {
  private apiClient = axios.create({
    baseURL: API_SERVER_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  constructor() {
    this.apiClient.interceptors.request.use(
      (config) => {
        // We don't need to manually add the token since it's in the HttpOnly cookie
        // and will be automatically sent with the request due to withCredentials: true
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
  async get(slug: string) {
    return await this.apiClient.get(slug);
  }

  async post(slug: string, data: any) {
    return await this.apiClient.post(slug, data);
  }

  async put(slug: string, data: any) {
    return await this.apiClient.put(slug, data);
  }

  async delete(slug: string) {
    return await this.apiClient.delete(slug);
  }
}

export default AxiosService;
