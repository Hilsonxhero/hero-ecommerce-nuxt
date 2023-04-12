<template>
  <div class="container">
    <div
      v-if="products?.length >= 1"
      class="hx-promotion__box w-full rounded-lg relative py-8 px-4 bg-gray-100 overflow-hidden h-full"
    >
      <div
        class="flex flex-col lg:flex-row items-stretch justify-start relative z-10"
      >
        <div
          class="flex flex-col items-center justify-center text-center mx-auto lg:justify-start w-60 min-w-[15rem]"
        >
          <h4 class="text-center mb-2 text-white text-3xl">تخفیفات ویژه</h4>
          <div class="text-base text-white mt-3 lg:mt-6 mb-6">مشاهده همه</div>
          <img
            class="w-24 h-full hidden lg:flex justify-end object-contain"
            src="@/assets/media/bell.png"
            alt=""
          />
        </div>
        <div class="flex-grow overflow-hidden">
          <swiper
            :modules="[Pagination, Navigation, Autoplay]"
            :breakpoints="config.breakpoints"
            :autoplay="config.auto"
          >
            <swiper-slide v-for="(product, index) in products">
              <BaseProduct :product="product"></BaseProduct>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk

import { Autoplay, Navigation, Pagination } from "swiper";
import BaseProduct from "@/modules/product/components/BaseProduct.vue";
const props = defineProps({
  products: {
    type: Array,
  },
});

// const modules = [Navigation, Pagination, Autoplay];
const config = ref({
  auto: {
    delay: 1000,
    disableOnInteraction: false,
  },
  breakpoints: {
    "320": {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    "410": {
      slidesPerView: 1.8,
      spaceBetween: 10,
    },
    "640": {
      slidesPerView: 2.1,
      spaceBetween: 10,
    },
    "768": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    "1024": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "1200": {
      slidesPerView: 4.5,
      spaceBetween: 10,
    },
    "1400": {
      slidesPerView: 5.5,
      spaceBetween: 10,
    },
  },
});
</script>

<style lang="scss" scoped>
.hx-promotion__box {
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 250px;
    background: url("@/assets/media/promotion.png") no-repeat;
    background-size: cover;
  }
}
</style>
