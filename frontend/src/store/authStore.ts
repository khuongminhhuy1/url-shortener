import { defineStore } from "pinia";
import NormalUser from "./user/NormalUser";
import AdminUser from "./user/AdminUser";
import type { UserData } from "../types/userData";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as NormalUser | AdminUser | null,
    isAuthenticated: false,
  }),
  persist: {
    key: "auth",
    storage: window.localStorage,
  },
  actions: {
    setUser(data: UserData | null) {
      if (data) {
        this.user =
          data.role === "ADMIN"
            ? new AdminUser(data.userId, data.name, data.email)
            : new NormalUser(data.userId, data.name, data.email);
        this.isAuthenticated = true;
      } else {
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
  },
});
