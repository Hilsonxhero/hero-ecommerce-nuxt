<template>
  <div>
    <section class="">
      <swiper
        class="swiper-main-ts"
        :loop="true"
        :pagination="{ clickable: true }"
        :modules="[SwiperAutoplay, Navigation, SwiperPagination]"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        :navigation="{
          nextEl: '.swiper-button-next-hero',
          prevEl: '.swiper-button-prev-hero',
        }"
      >
        <swiper-slide v-for="(item, index) in items" :key="index">
          <div>
            <img :src="item.banner" class="w-full h-60 lg:h-96 object-cover" />
          </div>
        </swiper-slide>

        <div
          class="hx-main-swiper__actions hidden items-center z-10 absolute right-0 bottom-[1rem]"
        >
          <div class="swiper-button-prev-hero mr-8 ml-2" slot="button-prev">
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              ></path>
            </svg>
          </div>
          <div class="swiper-button-next-hero" slot="button-next">
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
          </div>
        </div>
      </swiper>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk

import { Navigation } from "swiper";

const props = defineProps({
  items: {
    type: Array,
  },
});
</script>

<style lang="scss">
.swiper-main-ts {
  &:hover {
    .hx-main-swiper__actions {
      display: flex !important;
      transition: all 0.2s ease-in-out;
    }
  }
}

.swiper-main-ts .swiper-pagination {
  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }

  .swiper-pagination-bullet {
    &-active {
      width: 1.3rem;
      border-radius: 1rem;
      transition: width 0.2s ease-in-out;
      background: #fff;
      height: 6px;
    }
  }

  .swiper-pagination-bullet-active {
  }
}
</style>

<style>
.hx-main-swiper__actions {
}

.swiper-button-next-hero {
}

.swiper-button-prev-hero {
}

.swiper-button-next-hero,
.swiper-button-prev-hero {
  align-items: center;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: calc(0px - var(--swiper-navigation-size) / 2);
  z-index: 2;
  border: 1px solid var(--color-neutral-300);
  height: 40px;
  width: 40px;
  background-color: #fff;
  border-radius: 50%;
}

.swiper-button-next-hero,
.swiper-rtl .swiper-button-prev-hero {
  /* left: auto;
      right: 10px; */
}

.swiper-button-next-hero,
.swiper-rtl .swiper-button-next-hero {
  /* right: auto;
      left: 10px; */
  /* right: 4rem; */
}

.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: #333;
}

@media (max-width: 1024px) {
}
</style>
