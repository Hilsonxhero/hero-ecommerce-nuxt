<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-6">
      <a
        class="col-span-12 md:col-span-6 lg:col-span-4"
        v-for="(item, index) in items"
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
  items: {
    type: Array,
  },
});
</script>

<style scoped></style>
