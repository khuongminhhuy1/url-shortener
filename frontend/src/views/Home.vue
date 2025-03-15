<template>
  <div
    :style="{ backgroundImage: `url(${wallpaper})` }"
    class="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <!-- Header -->
    <div class="text-center mb-8 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 px-4">
      <h1
        class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        ShortenIt
      </h1>
      <p class="text-white text-base sm:text-lg md:text-xl mt-2">
        Use our URL shortener to engage your audience and connect them to the
        right information. Build, edit, and track everything you created.
      </p>
    </div>

    <!-- URL Shortener Section (Only If Logged In) -->
    <div
      v-if="authStore.isAuthenticated"
      class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-lg"
    >
      <UrlShortener />
    </div>

    <!-- Login Prompt (Only If Not Logged In) -->
    <div v-else class="text-center mt-4">
      <button
        @click="goToLogin"
        class="px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base md:text-lg"
      >
        Login to Create Short URL
      </button>
    </div>
  </div>
</template>

<script setup>
import wallpaper from "../assets/Wallpaper.png";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import UrlShortener from "../components/section/UrlShortener.vue";

const authStore = useAuthStore();
const router = useRouter();

const goToLogin = () => router.push("/login");
</script>
