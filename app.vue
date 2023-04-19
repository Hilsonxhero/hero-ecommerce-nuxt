<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store";
import { useUserStore } from "@/modules/user/store";

const store = useCommonStore();
const userStore = useUserStore();

onMounted(async () => {
  await Promise.all([store.fetchConfig(), userStore.init()]);
});
</script>
