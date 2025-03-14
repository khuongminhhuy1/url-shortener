import type { UserData } from "./../types/userData";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/apiServices";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();
  const loading = ref<boolean>(false);
  const errorMessage = ref<string>("");

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    loading.value = true;
    errorMessage.value = "";

    try {
      await authService.register(name, email, password);
      alert(
        "Registration successful! Please check your email to verify your account."
      );
      router.push("/login");
    } catch (error: any) {
      console.error("Register Error:", error);
      errorMessage.value =
        error.response?.data?.message || "Registration failed!";
    } finally {
      loading.value = false;
    }
  }

  async function login(email: string, password: string): Promise<void> {
    loading.value = true;
    errorMessage.value = "";
    try {
      const response = await authService.login(email, password);
      const token: string = response.data.data.token;

      const decoded = jwtDecode<UserData>(token);
      console.log(decoded);

      authStore.setUser(decoded);
      router.push("/"); // Redirect after login
    } catch (error: any) {
      console.error("Login Error:", error);
      errorMessage.value = error.response?.data?.message || "Login failed!";
    } finally {
      loading.value = false;
    }
  }

  async function logout(): Promise<void> {
    loading.value = true;
    try {
      await authService.logout();
      authStore.setUser(null);
      router.push("/"); // Redirect after logout
    } catch (error: any) {
      console.error("Logout Error:", error);
    } finally {
      loading.value = false;
    }
  }

  async function checkAuthState(): Promise<boolean> {
    loading.value = true;
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
      loading.value = false;
    }
  }

  return { register, login, logout, loading, errorMessage, checkAuthState };
}
