<template>
  <div
    class="flex flex-col min-h-screen bg-cover bg-white bg-center bg-fixed relative"
  >
    <!-- Sticky Header Section -->
    <Header
      class="sticky top-0 z-50 backdrop-blur shadow-md pb-4 border-b-1 border-amber-50"
    />

    <!-- Main Content Section -->
    <main class="w-full">
      <div class="w-full">
        <slot name="body"></slot>
      </div>
    </main>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script setup>
import Header from "./common/user/Header.vue";
import Footer from "./common/user/Footer.vue";
</script>
