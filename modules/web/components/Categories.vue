<template>
  <div class="container">
    <div class="bg-white">
      <div class="">
        <swiper
          class="swiper sw-categories"
          :breakpoints="config.breakpoints"
          :modules="[Navigation]"
          :slides-per-view="8"
          :navigation="{ nextEl: '.swiper-next-ct', prevEl: '.swiper-prev-ct' }"
        >
          <swiper-slide
            class="text-center my-12"
            v-for="(category, index) in categories"
          >
            <div class="flex flex-col items-center justify-center">
              <router-link
                to=""
                class="h-16 w-16 rounded-md text-white bg-gray-100 flex items-center justify-center"
              >
                <!-- <nuxt-icon class="w-16 h-1w-16" name="mobile-c"></nuxt-icon> -->
                <img class="p-1" :src="category?.media?.thumb" alt="" />
              </router-link>
              <h3
                class="mt-3 text-gray-600 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {{ category?.title }}
              </h3>
            </div>
          </swiper-slide>

          <button
            type="button"
            class="swiper-prev-ct mr-8 ml-2"
            slot="button-prev"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              ></path>
            </svg>
          </button>
          <button type="button" class="swiper-next-ct" slot="button-next">
            <div class="flex">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                ></path>
              </svg>
            </div>
          </button>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper";

const props = defineProps({
  categories: {},
});

const config = ref({
  auto: {
    delay: 1000,
    disableOnInteraction: false,
  },
  breakpoints: {
    "320": {
      slidesPerView: 3.5,
      spaceBetween: 5,
    },
    "410": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "640": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "768": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "1024": {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    "1200": {
      slidesPerView: 8,
      spaceBetween: 10,
    },
    "1400": {
      slidesPerView: 8,
      spaceBetween: 10,
    },
  },
});
</script>

<style>
.www {
  background: radial-gradient(
    circle at -4% -12.9%,
    rgb(74, 98, 110) 0.3%,
    rgb(30, 33, 48) 90.2%
  );
}

.sw-categories > .swiper-wrapper {
  flex-direction: row !important;
}

.swiper-next-ct {
  left: 10px;
  right: auto;
}

.swiper-prev-ct {
  right: 10px;
  left: auto;
}

.swiper-prev-ct,
.swiper-next-ct {
  position: absolute;
  top: 50%;
  align-items: center;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  z-index: 2;
  border: 1px solid var(--color-neutral-300);
  height: 40px;
  width: 40px;
  background-color: #fff;
  border-radius: 50%;
  display: none;
}
</style>
