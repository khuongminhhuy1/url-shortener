import { defineStore } from "pinia";
import { urlService } from "../services/apiServices";

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
  }),
  persist: {
    key: "urlStore",
    storage: window.localStorage,
  },
  actions: {
    async shortenUrl(original: string) {
      try {
        const response = await urlService.shortenUrl(original);
        if (response) {
          this.urls.unshift(response); // Add new URL at the beginning
        }
      } catch (error) {
        console.error("Shorten URL Error:", error);
      }
    },
    async getUserUrls(userId: string) {
      try {
        const response = await urlService.getUserUrls(userId);
        this.urls = response;
      } catch (error) {
        console.error("Failed to fetch user URLs:", error);
      }
    },
  },
});