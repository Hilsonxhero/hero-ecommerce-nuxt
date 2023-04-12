<template>
  <div class="text-3xl text-center w-full text-red-600">index page</div>

  <!-- <NuxtWelcome /> -->

  <div v-for="(portfolio, index) in posts">
    <span>{{ portfolio.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { counter } = storeToRefs(store);
const portfolios = ref([]);

const { pending, data: posts } = useLazyFetch(
  "https://jsonplaceholder.typicode.com/posts"
);
watch(posts, (newPosts) => {});

const fetchPortfolios = () => {};

onMounted(() => {
  // fetchPortfolios();
});
</script>

<style scoped></style>
