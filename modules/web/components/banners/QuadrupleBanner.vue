<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-3">
      <a
        v-for="(item, index) in items"
        class="col-span-6 md:col-span-4 lg:col-span-3"
        :href="item.url"
        target="_blank"
      >
        <div class="relative w-full overflow-hidden">
          <img
            class="rounded-xl shadow-xl"
            :src="item.banner"
            :alt="item.title"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: Array,
});
</script>

<style scoped></style>
