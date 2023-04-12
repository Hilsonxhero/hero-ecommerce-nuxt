<template>
  <div>
    <section>
      <TopSlider :items="init?.data?.banners?.header_banners" />
    </section>
    <section class="">
      <Categories :categories="init?.data?.main_categories" />
    </section>
    <section class="">
      <Promotion :products="init?.data?.incredible_products" />
    </section>
    <section class="my-12">
      <QuadrupleBanner :items="init?.data?.banners?.top_banners" />
    </section>
    <section class="my-12">
      <Bestselling :products="init?.data?.best_selling_products" />
    </section>
    <section class="my-12">
      <TripleBanner :items="init?.data?.banners?.middle_banners" />
    </section>
    <section class="my-8">
      <Recommendations :recommendations="recommendations?.data" />
    </section>
    <section class="my-12">
      <Articles :items="init?.data?.articles" />
    </section>
  </div>

  <!-- <NuxtWelcome /> -->
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import TopSlider from "@/modules/web/components/TopSlider.vue";
import Categories from "@/modules/web/components/Categories.vue";
import Promotion from "@/modules/web/components/Promotion.vue";
import Bestselling from "@/modules/web/components/Bestselling.vue";
import QuadrupleBanner from "@/modules/web/components/banners/QuadrupleBanner.vue";
import TripleBanner from "@/modules/web/components/banners/TripleBanner.vue";
import Articles from "@/modules/article/components/Articles.vue";
import Recommendations from "@/modules/web/components/recommendation/Recommendations.vue";
const store = useCounterStore();
const { counter } = storeToRefs(store);
const portfolios = ref([]);
const config = useRuntimeConfig();
const { pending, data: init } = useApiService("landing");
const { data: recommendations } = useApiService("recommendation");
watch(init, (newVal) => {
  console.log("newVal", newVal);
});

const fetchPortfolios = () => {};

onMounted(() => {
  // fetchPortfolios();
});
</script>

<style scoped></style>
