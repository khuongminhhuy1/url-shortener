<template>
  <section class="h-screen flex items-center justify-center bg-gray-100">
    <div class="container w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center">Login</h2>

      <form @submit.prevent="handleLogin">
        <!-- Email input -->
        <div class="relative mb-4">
          <label for="email" class="text-sm text-gray-600">Email address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full p-2 border rounded mt-1"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password input -->
        <div class="relative mb-4">
          <label for="password" class="text-sm text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full p-2 border rounded mt-1"
            placeholder="Enter your password"
          />
        </div>

        <!-- Remember me & Forgot password -->
        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center text-sm">
            <input type="checkbox" class="mr-2" /> Remember me
          </label>
          <a href="#" class="text-blue-500 text-sm">Forgot password?</a>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">
          {{ errorMessage }}
        </p>
      </form>

      <!-- Divider -->
      <div
        class="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300"
      >
        <p class="mx-4 text-center text-gray-600">OR</p>
      </div>

      <!-- Social login buttons -->
      <button
        class="w-full bg-blue-700 text-white py-2 rounded mb-2 hover:bg-blue-800"
      >
        Continue with Facebook
      </button>
      <button class="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Continue with X
      </button>

      <!-- Register link -->
      <p class="mt-4 text-center text-sm">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline"
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

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const { login } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  await login(email.value, password.value);
  router.push("/");
};
</script>
