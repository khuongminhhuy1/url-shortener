import { defineStore } from "pinia";
import { urlService } from "../services/apiServices";
import { useToast } from "vue-toastification";

interface UserUrl {
  id: string;
  shortCode: string;
  original: string;
  clicks: number;
  createdAt: string;
  userId: string;
}

export const useUrlStore = defineStore("urlStore", {
  state: () => ({
    urls: [] as UserUrl[],
    loading: false,
    error: "",
  }),
  persist: {
    key: "urlStore",
    storage: window.localStorage,
  },
  actions: {
    async shortenUrl(original: string) {
      const toast = useToast();
      this.loading = true;
      this.error = "";
      try {
        const response = await urlService.shortenUrl(original);
        // Make sure the response matches your UserUrl interface
        if (response) {
          // Add to the beginning of the array
          this.urls.unshift(response);
          toast.success(
            "Url has been created ! Check your dashboard to see it"
          );
        }
        return response;
      } catch (error: any) {
        console.error("Shorten URL Error:", error);
        this.error = error.message || "Failed to shorten URL";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getUrlStats(shortCode: string) {
      this.loading = true;
      this.error = "";
      try {
        const response = await urlService.getUrlStats(shortCode);
        return response;
      } catch (error: any) {
        this.error = error.message || "Failed to get URL Stats";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getUserUrls(userId: string) {
      this.loading = true;
      this.error = "";
      try {
        const response = await urlService.getUserUrls(userId);
        console.log("User URLs response:", response);

        this.urls = Array.isArray(response) ? response : response.data || [];
        return this.urls;
      } catch (error: any) {
        console.error("Failed to fetch user URLs:", error);
        this.error = error.message || "Failed to fetch URLs";
        this.urls = [];
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deleteUrl(id: string) {
      this.loading = true;
      this.error = "";
      try {
        await urlService.deleteUrl(id);
        this.urls = this.urls.filter((url) => url.id !== id);
      } catch (error: any) {
        console.error("Delete URL Error:", error);
        this.error = error.message || "Failed to delete URL";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    clearUrls() {
      this.urls = [];
    },
  },
});
