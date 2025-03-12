<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-6">
    <h2 class="text-xl font-semibold">URL Stats</h2>
    <input
      v-model="shortCode"
      class="w-full p-2 border rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Enter Short Code"
    />
    <button
      @click="fetchStats"
      :disabled="store.loading"
      class="w-full mt-3 bg-green-500 text-white py-2 rounded"
    >
      {{ store.loading ? "Loading..." : "Get Stats" }}
    </button>
    <p v-if="store.stats" class="mt-2">Clicks: {{ store.stats.clicks }}</p>
    <p v-if="store.error" class="text-red-500">{{ store.error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUrlStore } from "../store/urlStore";

const store = useUrlStore();
const shortCode = ref("");

const fetchStats = () => store.getUrlStats(shortCode.value);
</script>
