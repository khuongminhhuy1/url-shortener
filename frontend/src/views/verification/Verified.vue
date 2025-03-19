<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-purple-600"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
      <div class="text-5xl text-green-500">✔</div>
      <h1 class="text-2xl font-bold text-fuchsia-600 mt-4">Email Verified!</h1>
      <p class="text-gray-600 mt-2">
        Your email has been successfully verified. You can now log in.
      </p>
      <router-link
        to="/login"
        class="mt-4 inline-block bg-fuchsia-500 text-white py-2 px-6 rounded-lg hover:bg-fuchsia-600 transition duration-300"
      >
        Go to Login
      </router-link>
    </div>
  </div>
</template>
<script setup></script>
