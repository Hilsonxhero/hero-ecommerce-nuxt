<template>
  <nuxt-link
    to="/"
    class="col-span-12 md:col-span-6 lg:col-span-3 relative overflow-hidden rounded-xl group w-auto h-[13.5rem] lg:h-[14.75rem]"
  >
    <div
      class="w-full h-full transition duration-300 lg:transform group-hover:lg:scale-105 block"
    >
      <img
        :src="article?.media?.thumb"
        loading="lazy"
        class="w-full h-full transition-opacity duration-500 object-cover"
      />
    </div>
    <div class="liniear-gr"></div>
    <div
      class="absolute bottom-5 px-3 text-white whitespace-normal text-sm font-medium lg:z-30 lg:right-3 lg:px-0 lg:text-base lg:transform lg:transition-all lg:duration-300 lg:group-hover:bottom-3"
    >
      {{ article?.title }}
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object,
  },
});
</script>

<style scoped>
.liniear-gr {
  background: linear-gradient(
    0deg,
    #020024,
    #050000 4%,
    #2d2525 13%,
    rgba(61, 54, 54, 0.03125) 54%
  );
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-duration: 700ms;
}
</style>
