<template>
  <section
    class="h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-500 to-purple-600 text-fuchsia-600"
  >
    <div
      class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg animate-jump-in"
    >
      <!-- Logo / Branding -->
      <div class="text-center mb-6">
        <h2
          class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600 pb-2"
        >
          Login
        </h2>
        <p class="text-gray-500 text-sm">Log in to access your account</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email input -->
        <div class="mb-4">
          <label for="email" class="block text-gray-600 text-sm font-medium"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600 text-sm font-medium"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        <!-- Remember me & Forgot password -->
        <div
          class="flex justify-between items-center mb-4 text-sm text-gray-600"
        >
          <label class="flex items-center">
            <input type="checkbox" class="mr-2 accent-fuchsia-500" /> Remember
            me
          </label>
          <router-link
            to="/forgot-password"
            class="text-fuchsia-600 hover:underline"
            >Forgot Password ?</router-link
          >
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 transition-all disabled:bg-gray-400 flex items-center justify-center"
        >
          <svg
            v-if="authStore.loading"
            class="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"
            viewBox="0 0 24 24"
          ></svg>
          {{ authStore.loading ? "Signing in..." : "Sign in" }}
        </button>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">
          {{ errorMessage }}
        </p>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <p class="mx-4 text-sm text-gray-600">OR</p>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- Register link -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-fuchsia-500 hover:underline"
          >Sign up</router-link
        >
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import { useAuthStore } from "../../store/authStore";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const { login } = useAuth();
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  await login(email.value, password.value);
  router.push("/");
};
</script>
