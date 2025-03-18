<template>
  <div
    :style="{ backgroundImage: `url(${Wallpaper})` }"
    class="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 text-center"
  >
    <!-- Header -->
    <div class="w-full max-w-3xl px-4">
      <h1
        class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        ShortenIt
      </h1>
      <p
        class="text-white text-base sm:text-lg md:text-xl lg:text-2xl mt-4 leading-relaxed"
      >
        Use our URL shortener to engage your audience and connect them to the
        right information. Build, edit, and track everything you create.
      </p>
    </div>

    <!-- URL Shortener Section (If Logged In) -->
    <div
      v-if="authStore.isAuthenticated"
      class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-8 p-6 backdrop-blur border border-fuchsia-300 bg-opacity-90 rounded-lg shadow-lg"
    >
      <UrlShortener />
    </div>
    <div
      v-if="authStore.isAuthenticated"
      class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-8 mb-9 backdrop-blur border border-fuchsia-300 bg-opacity-90 rounded-lg shadow-lg"
    >
      <Stats />
    </div>

    <!-- Login Prompt (If Not Logged In) -->
    <div v-else class="mt-6">
      <button
        @click="goToLogin"
        class="px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 transition duration-300 text-sm sm:text-base md:text-lg"
      >
        Login to Create Short URL
      </button>
    </div>
  </div>
</template>

<script setup>
import Wallpaper from "../assets/Wallpaper.png";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import UrlShortener from "../components/section/UrlShortener.vue";
import Stats from "../components/section/Stats.vue";

const authStore = useAuthStore();
const router = useRouter();

const goToLogin = () => router.push("/login");
</script>
