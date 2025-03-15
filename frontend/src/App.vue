<template>
  <div>
    <div v-if="layout === 'admin'" class="min-h-screen">
      <AdminLayout>
        <template #body>
          <RouterView />
        </template>
      </AdminLayout>
    </div>
    <div v-else>
      <div v-if="noHeader" class="min-h-screen">
        <RouterView />
      </div>
      <div v-else class="min-h-screen">
        <UserLayout>
          <template #body>
            <LoadingScreen v-if="loading" />
            <!-- Show loading before mount -->
            <router-view v-else />
          </template>
        </UserLayout>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import UserLayout from "./components/layouts/UserLayout.vue";
import AdminLayout from "./components/layouts/AdminLayout.vue";
import { computed, onBeforeMount, ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAuth } from "./composables/useAuth";
import LoadingScreen from "./components/loading/LoadingScreen.vue";

const auth = useAuth();
const route = useRoute();
const layout = computed(() => route.meta.layout || "default");
const noHeader = computed(() => route.meta.noHeader);

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false; // Hide loader after 2 seconds
  }, 2000);
});
onBeforeMount(async () => {
  await auth.checkAuthState();
});
</script>
