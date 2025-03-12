import UrlService from "../services/apiServices";
import { defineStore } from "pinia";

export const useUrlStore = defineStore("urlStore", {
  state: () => ({
    shortUrl: "",
    stats: null as { clicks: number } | null,
    error: "",
    loading: false,
  }),

  actions: {
    async shortenUrl(original: string) {
      this.loading = true;
      this.error = "";
      try {
        const data = await UrlService.shortenUrl(original);
          this.shortUrl = data.short;
      } catch (error) {
        console.error("Shorten URL Error:", error);
        this.error = "Failed to shorten URL";
      } finally {
        this.loading = false;
      }
    },

    async getUrlStats(shortCode: string){
      this.loading = true;
      this.error = "";
      try {
        const data = await UrlService.getUrlStats(shortCode);
          this.stats = data;
      } catch (error) {
        console.error("Fetch Stats Error:", error);
        this.error = "Failed to fetch stats";
      } finally {
        this.loading = false;
      }
    },
  },
});
