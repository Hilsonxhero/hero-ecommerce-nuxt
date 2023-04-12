<template>
  <div>
    <BaseHeader />
    <main>
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/app/BaseHeader.vue";
import BaseFooter from "@/components/app/BaseFooter.vue";
</script>

<style scoped></style>
