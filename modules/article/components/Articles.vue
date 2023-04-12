<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-y-6 gap-2 lg:gap-4">
      <ArticleItem
        v-for="(item, index) in items"
        :article="item"
        :key="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleItem from "@/modules/article/components/ArticleItem.vue";
const props = defineProps({
  items: {
    type: Array,
  },
});
</script>

<style scoped></style>
