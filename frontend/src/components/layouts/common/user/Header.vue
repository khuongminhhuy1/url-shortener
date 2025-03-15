<template>
  <nav
    class="p-4 bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white flex justify-between items-center shadow"
  >
    <router-link to="/" class="text-2xl font-bold">ShortenIt</router-link>

    <!-- If user is logged in, show dropdown -->
    <div v-if="authStore.isAuthenticated" class="relative">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost">
          👋 Hello, {{ authStore.user?.name || "User" }}
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-white text-gray-900 border border-gray-300 rounded-box shadow-md mt-2 w-48"
        >
          <li>
            <router-link
              to="/dashboard"
              class="hover:bg-gray-100 px-4 py-2 rounded"
            >
              Dashboard
            </router-link>
          </li>
          <li>
            <button
              @click="handleLogout"
              class="hover:bg-red-100 px-4 py-2 rounded text-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- If user is not logged in, show login button -->
    <div v-else>
      <router-link
        to="/login"
        class="px-4 py-2 bg-white text-fuchsia-600 rounded-lg hover:bg-gray-200"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../../../../composables/useAuth";
import { useAuthStore } from "../../../../store/authStore";
import { useRouter } from "vue-router";

const auth = useAuth();
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
};
</script>
