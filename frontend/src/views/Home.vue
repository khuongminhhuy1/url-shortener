<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
  >
    <div class="w-full max-w-md">
      <UrlShortener />
      <Stats />
    </div>
  </div>
</template>

<script setup>
import UrlShortener from "../components/UrlShortener.vue";
import Stats from "../components/Stats.vue";
</script>
