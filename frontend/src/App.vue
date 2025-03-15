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
            <RouterView />
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
import { computed, onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { useAuth } from "./composables/useAuth";

const auth = useAuth();
const route = useRoute();
const layout = computed(() => route.meta.layout || "default");
const noHeader = computed(() => route.meta.noHeader);
onBeforeMount(async () => {
  await auth.checkAuthState();
});
</script>
