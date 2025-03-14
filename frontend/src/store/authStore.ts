import { defineStore } from "pinia";
import NormalUser from "./user/NormalUser";
import AdminUser from "./user/AdminUser";
import type { UserData } from "../types/userData";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as NormalUser | AdminUser | null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(data: UserData | null) {
      if (data) {
        this.user =
          data.role === "ADMIN"
            ? new AdminUser(data.id, data.name, data.email)
            : new NormalUser(data.id, data.name, data.email);
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

  persist: {
    key: "auth",
    storage: localStorage,
  },
});
