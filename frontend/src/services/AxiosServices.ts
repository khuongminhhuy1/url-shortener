import axios from "axios";
import { API_SERVER_URL } from "../constants";
import { useAuthStore } from "../store/authStore";
import { useToast } from "vue-toastification";

class AxiosService {
  private apiClient = axios.create({
    baseURL: API_SERVER_URL,
    withCredentials: true,
  });

  private toast = useToast();

  constructor() {
    this.apiClient.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        this.toast.error("Request error. Please try again.");
        return Promise.reject(error);
      }
    );

    this.apiClient.interceptors.response.use(
      (response) => {
        if (response.data?.message) {
          this.toast.success(response.data.message);
        }
        return response;
      },
      async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        // Handle token expiration (403 Forbidden)
        if (
          error.response &&
          error.response.status === 403 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            await axios.get(`${API_SERVER_URL}/refresh-token`, {
              withCredentials: true,
            });

            // Retry the original request - new cookies will be sent automatically
            return this.apiClient(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            authStore.logout();
            this.toast.error("Session expired. Please log in again."); // Notify user
            return Promise.reject(refreshError);
          }
        }

        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        this.toast.error(errorMessage);
        return Promise.reject(error);
      }
    );
  }

  async get(slug: string) {
    return this.apiClient.get(slug);
  }

  async post(slug: string, data?: any) {
    return this.apiClient.post(slug, data ?? {});
  }

  async put(slug: string, data: any) {
    return this.apiClient.put(slug, data);
  }

  async delete(slug: string) {
    return this.apiClient.delete(slug);
  }
}

export default AxiosService;
