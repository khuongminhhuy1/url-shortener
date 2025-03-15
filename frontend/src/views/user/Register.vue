<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold text-center">Register</h2>

      <input
        v-model="name"
        type="text"
        placeholder="Full Name"
        class="w-full p-2 border rounded mt-4"
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded mt-2"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-2 border rounded mt-2"
      />

      <button
        @click="handleRegister"
        class="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Register
      </button>

      <p v-if="errorMessage" class="text-red-500 mt-2 text-center">
        {{ errorMessage }}
      </p>

      <p class="mt-4 text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const auth = useAuth();
const handleRegister = async () => {
  errorMessage.value = "";
  await auth.register(name.value, email.value, password.value);
  alert("Email successfully created, please check your email for verification");
  router.push("/");
};
</script>
