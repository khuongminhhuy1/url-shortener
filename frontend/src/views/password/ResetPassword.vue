<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-purple-600 text-fuchsia-600"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold text-center text-fuchsia-600">
        Reset Password
      </h2>
      <p class="text-center text-gray-600 mb-4">Enter your new password</p>

      <input
        v-model="password"
        type="password"
        placeholder="New Password"
        class="w-full p-2 border rounded mt-2 focus:ring-2 focus:ring-fuchsia-500"
      />

      <button
        @click="handleResetPassword"
        class="w-full mt-4 bg-fuchsia-500 text-white py-2 rounded hover:bg-fuchsia-600"
      >
        Reset Password
      </button>

      <p v-if="message" class="text-green-500 mt-2 text-center">
        {{ message }}
      </p>
      <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authService } from "../../services/apiServices";

const route = useRoute();
const router = useRouter();
const password = ref("");
const message = ref("");
const error = ref("");

const handleResetPassword = async () => {
  try {
    message.value = "";
    error.value = "";

    const token = route.query.token as string;
    if (!token) {
      error.value = "Invalid or expired reset link.";
      return;
    }

    await authService.resetPassword(token, password.value);
    message.value = "Password reset successful! Redirecting to login...";

    setTimeout(() => router.push("/login"), 2000);
  } catch (err) {
    const errorMessage = (err as any).response?.data?.message || "Failed to reset password";
    error.value = errorMessage;
  }
};
</script>
