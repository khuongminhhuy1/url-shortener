import axios from "axios";
import { API_SERVER_URL } from "../constants";
import { useAuthStore } from "../store/authStore";

class AxiosService {
  private apiClient = axios.create({
    baseURL: API_SERVER_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ✅ Automatically sends cookies (refresh token)
  });

  constructor() {
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.apiClient.get("/api/auth/refresh-token");

            return this.apiClient(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            authStore.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get(slug: string) {
    return this.apiClient.get(slug);
  }

  async post(slug: string, data: any) {
    return this.apiClient.post(slug, data);
  }

  async put(slug: string, data: any) {
    return this.apiClient.put(slug, data);
  }

  async delete(slug: string) {
    return this.apiClient.delete(slug);
  }
}

export default AxiosService;
