<template>
  <div
    class="min-h-screen flex items-center justify-center text-fuchsia-600 bg-gradient-to-r from-fuchsia-500 to-purple-600"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold text-center text-fuchsia-600">
        Forgot Password
      </h2>
      <p class="text-center text-gray-600 mb-4">
        Enter your email to reset your password
      </p>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded mt-2 focus:ring-2 focus:ring-fuchsia-500"
      />

      <button
        @click="handleForgotPassword"
        class="w-full mt-4 bg-fuchsia-500 text-white py-2 rounded hover:bg-fuchsia-600"
      >
        Send Reset Link
      </button>

      <p v-if="message" class="text-green-500 mt-2 text-center">
        {{ message }}
      </p>
      <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { authService } from "../../services/apiServices";

const email = ref("");
const message = ref("");
const error = ref("");

const handleForgotPassword = async () => {
  try {
    message.value = "";
    error.value = "";
    await authService.forgotPassword(email.value);
    message.value = "Reset link sent to your email!";
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to send reset link";
  }
};
</script>
