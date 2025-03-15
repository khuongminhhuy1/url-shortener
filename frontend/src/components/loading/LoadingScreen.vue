<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-50"
  >
    <div class="flex flex-col items-center">
      <!-- Loading Spinner -->
      <div
        class="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"
      ></div>

      <!-- Loading Text -->
      <p class="mt-6 text-lg font-semibold animate-pulse">Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const show = ref(true);

onMounted(() => {
  setTimeout(() => {
    show.value = false; // Hide after 2 seconds
  }, 2000);
});
</script>

<style scoped>
/* Optional fade-out effect */
.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
</style>
