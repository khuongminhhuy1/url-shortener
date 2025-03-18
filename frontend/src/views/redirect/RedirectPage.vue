<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6">
    <div v-if="loading" class="text-center">
      <div
        class="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto"
      ></div>
      <p class="mt-4 text-xl text-gray-700">
        Redirecting to your destination...
      </p>
    </div>

    <div
      v-else-if="error"
      class="text-center bg-white p-8 rounded-lg shadow-lg max-w-md"
    >
      <div class="text-red-500 text-5xl mb-4">⚠️</div>
      <h1 class="text-2xl font-bold text-red-600 mb-2">Link Not Found</h1>
      <p class="text-gray-700 mb-6">{{ error }}</p>
      <router-link
        to="/"
        class="px-6 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { urlService } from "../../services/apiServices";

const route = useRoute();
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const shortCode = route.params.shortCode;
    if (!shortCode) {
      error.value = "No short code provided";
      loading.value = false;
      return;
    }

    const response = await urlService.getOriginalUrl(shortCode);

    if (response && response.original) {
      console.log(`Redirecting to: ${response.original}`);

      const fullUrl = response.original.startsWith("http")
        ? response.original
        : `https://${response.original}`;

      window.location.href = fullUrl;
    } else {
      error.value = "URL not found";
      loading.value = false;
    }
  } catch (err) {
    console.error("Redirect error:", err);
    error.value =
      err.response?.data?.message || "Failed to redirect to destination";
    loading.value = false;
  }
});
</script>
