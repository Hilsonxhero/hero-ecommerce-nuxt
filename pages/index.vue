<template>
  <div>
    <section>
      <TopSlider :items="init?.banners?.header_banners" />
    </section>
    <section class="">
      <Categories :categories="init?.main_categories" />
    </section>
    <section class="">
      <Promotion :products="init?.incredible_products" />
    </section>
    <section class="my-12">
      <QuadrupleBanner :items="init?.banners?.top_banners" />
    </section>
    <section class="my-12">
      <Bestselling :products="init?.best_selling_products" />
    </section>
    <section class="my-12">
      <TripleBanner :items="init?.banners?.middle_banners" />
    </section>
    <section class="my-8">
      <Recommendations :recommendations="recommendations" />
    </section>
    <section class="my-12">
      <Articles :items="init?.articles" />
    </section>
  </div>

  <!-- <NuxtWelcome /> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import TopSlider from "@/modules/web/components/TopSlider.vue";
import Categories from "@/modules/web/components/Categories.vue";
import Promotion from "@/modules/web/components/Promotion.vue";
import Bestselling from "@/modules/web/components/Bestselling.vue";
import QuadrupleBanner from "@/modules/web/components/banners/QuadrupleBanner.vue";
import TripleBanner from "@/modules/web/components/banners/TripleBanner.vue";
import Articles from "@/modules/article/components/Articles.vue";
import Recommendations from "@/modules/web/components/recommendation/Recommendations.vue";

const init = ref();
const config = useRuntimeConfig();
const recommendations = ref([]);

const fetchPortfolios = () => {};

onMounted(async () => {
  const { data } = await useApiService.get("landing");

  init.value = data;

  const response = await useApiService.get("recommendation");

  recommendations.value = response.data;
});
</script>

<style scoped></style>
