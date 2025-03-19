<template>
  <section
    class="h-screen flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-purple-600"
  >
    <div
      class="container w-full max-w-md p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg"
    >
      <div class="text-center">
        <h2
          class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600 pb-2"
        >
          Sign Up
        </h2>
        <p class="text-gray-500 text-sm">Log in to access your account</p>
      </div>

      <form @submit.prevent="handleRegister">
        <!-- Name Input -->
        <div class="relative mb-4">
          <label for="name" class="text-sm text-gray-600 font-bold"
            >Full Name</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full p-3 bg-white bg-opacity-30 text-fuchsia-400 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <!-- Email Input -->
        <div class="relative mb-4">
          <label for="email" class="text-sm text-gray-600 font-bold"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full p-3 bg-white bg-opacity-30 text-fuchsia-400 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Input -->
        <div class="relative mb-4">
          <label for="password" class="text-sm text-gray-600 font-bold"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full p-3 bg-white bg-opacity-30 border-gray-400 text-fuchsia-400 rounded-lg border focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <!-- Register Button -->
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
          {{ authStore.loading ? "Registering..." : "Register" }}
        </button>

        <!-- Error Message -->
        <p
          v-if="errorMessage"
          class="text-red-400 text-center mt-2 transition-opacity duration-300"
        >
          {{ errorMessage }}
        </p>
      </form>

      <!-- Divider -->
      <div
        class="my-4 flex items-center before:flex-1 before:border-t before:border-fuchsia-300 after:flex-1 after:border-t after:border-fuchsia-300"
      >
        <p class="mx-4 text-center text-fuchsia-300">OR</p>
      </div>

      <!-- Login Redirect -->
      <p class="mt-4 text-center text-gray-600 text-sm">
        Already have an account?
        <router-link
          to="/login"
          class="text-fuchsia-400 font-semibold hover:underline transition-all"
        >
          Login
        </router-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import { useAuthStore } from "../../store/authStore";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const auth = useAuth();
const authStore = useAuthStore();
const handleRegister = async () => {
  errorMessage.value = "";
  await auth.register(name.value, email.value, password.value);
  router.push("/");
};
</script>
