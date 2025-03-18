<template>
  <div class="max-w-md mx-auto p-6 rounded-lg">
    <h2
      class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600"
    >
      URL Statistics
    </h2>
    <p>Paste your Url here to see hgow many clicks it get !</p>
    <!-- Input for Short Code -->
    <div class="relative mt-4">
      <input
        v-model="shortCode"
        class="w-full p-3 text-fuchsia-600 border bg-gray-900 border-gray-300 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
        placeholder="Enter Short Code"
      />
    </div>

    <!-- Get Stats Button -->
    <button
      @click="fetchStats"
      :disabled="store.loading || !shortCode"
      class="w-full mt-4 py-3 font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 rounded-lg transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ store.loading ? "Fetching Data..." : "Get Stats" }}
    </button>

    <!-- Loading Indicator -->
    <div v-if="store.loading" class="flex justify-center mt-4">
      <div
        class="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <!-- Stats Display -->
    <div
      v-if="stats"
      class="mt-5 p-4 bg-gray-900 rounded-lg shadow-md text-center"
    >
      <p class="text-xl font-bold text-fuchsia-600">
        Clicks:
        <span class="text-fuchsia-500 font-bold">{{ stats.clicks }}</span>
      </p>
    </div>

    <!-- Error Message -->
    <p v-if="store.error" class="text-red-500 text-center mt-3 font-medium">
      ❌ {{ store.error }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUrlStore } from "../../store/urlStore";
import { useToast } from "vue-toastification";

const store = useUrlStore();
const toast = useToast();
const shortCode = ref("");
const stats = ref(null);

const fetchStats = async () => {
  if (!shortCode.value) return;
  const extractShortCode = (input) => {
    try {
      const url = new URL(input);
      return url.pathname.replace("/", ""); // Get the last part after "/"
    } catch (error) {
      return input; // If it's not a valid URL, return as is (assume it's already a short code)
    }
  };
  try {
    const extractedCode = extractShortCode(shortCode.value);
    if (!extractedCode) {
      toast.error("Invalid input. Please enter a valid short code.");
      return;
    }

    stats.value = await store.getUrlStats(extractedCode);
    toast.success("Stats retrieved successfully!");
  } catch (error) {
    console.error("Error fetching stats:", error);
    toast.error("Failed to get stats.");
  }
};
</script>
