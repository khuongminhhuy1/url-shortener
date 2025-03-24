import type { UserData } from "../types/userData";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/apiServices";
import { jwtDecode } from "jwt-decode";
import { ref } from "vue";

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();
  const errorMessage = ref<string>("");

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    authStore.setLoading(true);
    errorMessage.value = "";

    try {
      await authService.register(name, email, password);
      await router.push("/login");
    } catch (error: any) {
      console.error("Register Error:", error);
      errorMessage.value =
        error.response?.data?.message || "Registration failed!";
    } finally {
      authStore.setLoading(false);
    }
  }

  async function login(email: string, password: string): Promise<void> {
    authStore.setLoading(true);
    errorMessage.value = "";

    try {
      const response = await authService.login(email, password);
      const token = response.token;

      // Decode token to get user data
      const decoded = jwtDecode<UserData>(token);
      authStore.setUser(decoded);

      await router.push("/"); // Redirect after login
    } catch (error: any) {
      console.error("Login Error:", error);
      errorMessage.value = error.response?.data?.message || "Login failed!";
    } finally {
      authStore.setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    authStore.setLoading(true);

    try {
      await authService.logout();
      authStore.setUser(null);
      await router.push("/login"); // Redirect to login after logout
    } catch (error: any) {
      console.error("Logout Error:", error);
    } finally {
      authStore.setLoading(false);
    }
  }

  async function checkAuthState(): Promise<boolean> {
    authStore.setLoading(true);

    try {
      const response = await authService.verifySession();
      if (response.data?.user) {
        authStore.setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.log("No active session or session expired");
      authStore.setUser(null);
      return false;
    } finally {
      authStore.setLoading(false);
    }
  }

  return { register, login, logout, checkAuthState, errorMessage };
}
