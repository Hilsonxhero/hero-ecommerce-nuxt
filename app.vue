<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store";
const store = useCommonStore();
store.fetchConfig();
</script>
