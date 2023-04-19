<template>
  <div class="w-full lg:w-[27rem] mx-auto">
    <swiper
      class="product-swiper-mi"
      :slidesPerView="1"
      :modules="[Navigation]"
      :pagination="{ clickable: true }"
    >
      <swiper-slide>
        <div>
          <div class="relative bg-transparent flex-shrink-0">
            <div class="contacts h-[20rem]">
              <img
                alt="گوشی موبایل سامسونگ مدل Galaxy A13 دو سیم کارت ظرفیت 64 گیگابایت و 4 گیگابایت رم 1 "
                :src="source"
                class="w-full h-full transition transform origin-center duration-500 delay-150 translate-x-0 top-0 z-10 object-contain cursor-pointer"
                width="400"
                height="600"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper";

const props = defineProps({
  source: {
    type: String,
  },
});
</script>

<style lang="scss">
.product-swiper-mi .swiper-pagination {
  @apply lg:hidden flex justify-end left-2 relative mt-5;

  //   transform: translateY(2rem);

  .swiper-pagination-bullet {
    &-active {
      width: 1.3rem;
      border-radius: 1rem;
      transition: width 0.2s ease-in-out;
      //   background: #fff;
      height: 6px;
    }
  }

  .swiper-pagination-bullet-active {
  }
}
</style>
