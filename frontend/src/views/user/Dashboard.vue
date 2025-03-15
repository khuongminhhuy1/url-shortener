<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold text-blue-600">Dashboard</h1>
    <p class="text-gray-600 mt-2">Welcome, {{ authStore.user?.name }}!</p>

    <!-- Shortener Input -->
    <div class="bg-white p-4 mt-6 rounded-lg shadow flex gap-3">
      <input
        v-model="originalUrl"
        placeholder="Enter URL to shorten..."
        class="flex-1 p-2 border rounded"
      />
      <button
        @click="shortenUrl"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Shorten
      </button>
    </div>

    <!-- User URLs List -->
    <ul v-if="urls.length" class="mt-3">
      <li
        v-for="url in urls"
        :key="url.id"
        class="p-4 border rounded-lg mt-2 bg-white shadow flex justify-between items-center"
      >
        <div>
          <a :href="url.original" target="_blank" class="text-blue-500">
            {{ url.shortCode }}
          </a>
          <a :href="url.original"> {{ url.original }}</a>
          <p class="text-gray-500 text-sm">Clicks: {{ url.clicks }}</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="copyUrl(url.shortCode)"
            class="btn btn-outline btn-sm"
          >
            📋 Copy
          </button>
          <button @click="deleteUrl(url.id)" class="btn btn-error btn-sm">
            ❌ Delete
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="text-gray-500 mt-3">
      You have not created any short URLs yet.
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useUrlStore } from "../../store/urlStore";
import { useAuthStore } from "../../store/authStore";

const authStore = useAuthStore();
const urlStore = useUrlStore();
const originalUrl = ref("");
const urls = ref(urlStore.urls);

watch(
  () => urlStore.urls,
  (newUrls) => {
    urls.value = newUrls;
  }
);
const shortenUrl = async () => {
  if (!originalUrl.value) return;
  await urlStore.shortenUrl(originalUrl.value);
  originalUrl.value = "";
};
const copyUrl = async (shortCode) => {
  const fullUrl = `${window.location.origin}/${shortCode}`;
  try {
    await navigator.clipboard.writeText(fullUrl);
    alert(`Copied to clipboard: ${fullUrl}`);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};
onMounted(async () => {
  if (authStore.user?.id) {
    await urlStore.getUserUrls(authStore.user.id);
  }
});
</script>
