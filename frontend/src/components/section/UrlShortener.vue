<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-semibold">Shorten URL</h2>
    <input
      v-model="url"
      class="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter URL"
    />
    <button
      @click="shorten"
      :disabled="store.loading"
      class="w-full mt-3 bg-blue-500 text-white py-2 rounded"
    >
      {{ store.loading ? "Shortening..." : "Shorten" }}
    </button>
    <p v-if="store.shortUrl" class="mt-2">
      Short URL:
      <a :href="store.shortUrl" class="text-blue-500">{{ store.shortUrl }}</a>
    </p>
    <p v-if="store.error" class="text-red-500">{{ store.error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUrlStore } from "../../store/urlStore";

const store = useUrlStore();
const url = ref("");

const shorten = () => store.shortenUrl(url.value);
</script>
