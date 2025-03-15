<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <h1 class="text-3xl font-bold text-blue-600">Welcome to ShortenIt 🚀</h1>
    <p class="mt-2 text-gray-600">Shorten your long URLs instantly!</p>

    <UrlShortener v-if="authStore.isAuthenticated" />

    <button
      v-else
      @click="goToLogin"
      class="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg"
    >
      Login to Create Short URL
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import UrlShortener from "../components/section/UrlShortener.vue";

const authStore = useAuthStore();
const router = useRouter();

const goToLogin = () => router.push("/login");
</script>
