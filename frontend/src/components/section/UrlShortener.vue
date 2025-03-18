<template>
  <div class="">
    <h2
      class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600"
    >
      Shorten Your URL
    </h2>

    <!-- URL Input Field -->
    <input
      v-model="url"
      class="w-full p-3 text-fuchsia-600 border bg-gray-900 border-gray-300 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
      placeholder="Enter your URL..."
    />

    <!-- Shorten Button -->
    <button
      @click="shorten"
      :disabled="store.loading"
      class="w-full mt-4 py-3 font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 rounded-lg transition-all shadow-md disabled:bg-gray-400"
    >
      {{ store.loading ? "Shortening..." : "Create Short URL" }}
    </button>

    <!-- Display Shortened URL -->
    <div
      v-if="store.shortUrl"
      class="mt-4 p-3 bg-gray-100 border border-fuchsia-300 rounded-lg flex items-center justify-between"
    >
      <a
        :href="store.shortUrl"
        target="_blank"
        class="text-fuchsia-600 font-medium break-all"
      >
        {{ store.shortUrl }}
      </a>
      <button
        @click="copyUrl"
        class="ml-2 p-1 text-sm bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600"
      >
        📋 Copy
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="store.error" class="text-red-500 text-center mt-2">
      {{ store.error }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUrlStore } from "../../store/urlStore";

const store = useUrlStore();
const url = ref("");

const shorten = async () => {
  if (!url.value) return;
  await store.shortenUrl(url.value);
};

const copyUrl = async () => {
  if (store.shortUrl) {
    await navigator.clipboard.writeText(store.shortUrl);
    alert("Short URL copied to clipboard!");
  }
};
</script>
