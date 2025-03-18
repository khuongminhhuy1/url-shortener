<template>
  <div
    :style="{ backgroundImage: `url(${dashboardWallpaper})` }"
    class="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-5xl bg-gray-800 p-8 rounded-lg shadow-lg border border-fuchsia-300"
    >
      <!-- Dashboard Header -->
      <h1
        class="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600 text-center"
      >
        Dashboard
      </h1>
      <p class="text-gray-300 mt-2 text-lg text-center">
        Welcome, {{ authStore.user?.name }}!
      </p>

      <!-- Shortener Input -->
      <div class="mt-6">
        <label
          for="originalUrl"
          class="text-fuchsia-500 font-bold block text-center"
        >
          Create a new short URL:
        </label>
        <div class="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <input
            v-model="originalUrl"
            placeholder="Enter URL to shorten..."
            class="flex-1 p-2 border text-fuchsia-600 rounded-lg focus:ring-2 focus:ring-fuchsia-500 w-full sm:w-auto"
          />
          <button
            @click="shortenUrl"
            :disabled="urlStore.loading"
            class="bg-fuchsia-600 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-700 transition-all"
          >
            {{ urlStore.loading ? "Shortening..." : "Shorten" }}
          </button>
        </div>
      </div>

      <!-- User URLs List -->
      <div
        v-if="paginatedUrls.length"
        class="mt-8 bg-gray-900 p-6 rounded-lg shadow border border-fuchsia-300"
      >
        <h2 class="text-xl font-semibold text-fuchsia-400 text-center">
          Your Shortened URLs
        </h2>
        <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li
            v-for="url in paginatedUrls"
            :key="url.id"
            class="p-4 bg-white border rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <router-link
                :to="'/' + url.shortCode"
                class="text-fuchsia-600 font-medium hover:underline break-words"
              >
                {{ windowLocation }}/{{ url.shortCode }}
              </router-link>
              <p class="text-gray-600 text-sm mt-1">Clicks: {{ url.clicks }}</p>
            </div>
            <div class="flex gap-3 mt-3">
              <button
                @click="copyUrl(url.shortCode)"
                class="w-full sm:w-auto px-3 py-1 text-sm bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600"
              >
                📋 Copy
              </button>
              <button
                @click="deleteUrl(url.id)"
                class="w-full sm:w-auto px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ❌ Delete
              </button>
            </div>
          </li>
        </ul>

        <!-- Pagination Controls -->
        <div class="mt-6 flex justify-center gap-3">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            <
          </button>
          <span class="px-3 py-1 text-fuchsia-400"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            >
          </button>
        </div>
      </div>

      <!-- No URLs Message -->
      <p v-else class="text-gray-400 mt-6 text-center text-lg">
        You have not created any short URLs yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useUrlStore } from "../../store/urlStore";
import { useAuthStore } from "../../store/authStore";
import dashboardWallpaper from "../../assets/Dashboard_Wallpaper.jpg";

const authStore = useAuthStore();
const urlStore = useUrlStore();
const originalUrl = ref("");
const windowLocation = ref(window.location.origin);

const urls = computed(() => urlStore.urls);
const currentPage = ref(1);
const itemsPerPage = 6;

// **Pagination Computed Property**
const paginatedUrls = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return urls.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(urls.value.length / itemsPerPage));

// **Shorten URL**
const shortenUrl = async () => {
  if (!originalUrl.value) return;
  try {
    await urlStore.shortenUrl(originalUrl.value);
    originalUrl.value = ""; // Clear input after successful shortening
  } catch (error) {
    console.error("Error shortening URL:", error);
  }
};

// **Copy URL to Clipboard**
const copyUrl = async (shortCode) => {
  const fullUrl = `${window.location.origin}/${shortCode}`;
  try {
    await navigator.clipboard.writeText(fullUrl);
    alert(`Copied to clipboard: ${fullUrl}`);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

// **Delete URL**
const deleteUrl = async (id) => {
  if (confirm("Are you sure you want to delete this URL?")) {
    await urlStore.deleteUrl(id);
  }
};

// **Watch User Authentication**
watch(
  () => authStore.user,
  (newUser) => {
    if (newUser?.id) {
      urlStore.getUserUrls(newUser.id);
    } else {
      urlStore.clearUrls();
    }
  }
);

// **Pagination Handlers**
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// **Fetch User URLs on Mount**
onMounted(async () => {
  if (authStore.user?.userId) {
    console.log("Fetching URLs for user ID:", authStore.user.userId);
    await urlStore.getUserUrls(authStore.user.userId);
  } else {
    console.warn("No user ID available to fetch URLs");
  }
});
</script>
