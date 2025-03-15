<template>
  <div class="flex gap-4">
    <!-- Show Login Button if user is not logged in -->
    <button
      v-if="!authStore.isAuthenticated"
      @click="handleLogin"
      class="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all"
    >
      Login
    </button>

    <!-- Show User's Name or Logout Button if user is logged in -->
    <div v-if="authStore.user.isAuthenticated">
      <div class="dropdown dropdown-end ml-2">
        <div tabindex="0" role="button" class="">
          <div class="">
            <p>Hello ,{{ authStore.user.name }}</p>
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-gray-900 text-white border border-amber-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li><a>Settings</a></li>

          <!-- Show Admin Route Only If User is Admin -->
          <li v-if="authStore.user?.role === 'ADMIN'">
            <router-link to="/admin"
              ><a class="justify-between text-red-500"
                >Admin Panel</a
              ></router-link
            >
          </li>

          <li><button @click="handleLogout">Logout</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "../../composables/useAuth";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "vue-router";

// Get access to the store
const auth = useAuth();
const router = useRouter();
const authStore = useAuthStore();

// Handle login redirection
function handleLogin() {
  router.push("/login");
}

// Handle logout
async function handleLogout() {
  await auth.logout();
  router.push("/"); // Redirect to home after logging out
}
</script>
