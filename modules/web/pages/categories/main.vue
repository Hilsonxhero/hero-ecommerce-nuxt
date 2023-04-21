<template>
  <div>
    <section>
      <!-- <TopSlider /> -->
    </section>

    <section class="my-12">
      <!-- <Promotion /> -->
    </section>

    <section class="my-12">
      <div class="container">
        <div class="mb-12 flex justify-center">
          <h4 class="text-xl">خرید بر اساس دسته بندی</h4>
        </div>
        <div class="grid grid-cols-12 lg:grid-cols-5 gap-4 gap-y-10">
          <div
            class="col-span-6 md:col-span-4 lg:col-span-1 rounded-xl"
            v-for="(item, index) in 10"
          >
            <nuxt-link to="" class="flex flex-col items-center">
              <div
                class="w-[8rem] h-[8rem] lg:w-[12rem] lg:h-[12rem] mix-blend-multiply"
              >
                <img
                  class="w-full h-full object-contain"
                  src="/media/products/16.jpg"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div class="my-4">
                <h1 class="">لپ تاپ</h1>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <!-- <Brands /> -->
  </div>
</template>

<script setup lang="ts">
// import TopSlider from "@/modules/web/components/main/slider/TopSlider.vue";
// import Promotion from "@/modules/web/components/main/promotion/promotion.vue";
// import Brands from "@/components/app/main/brands/carousel.vue";
</script>

<style scoped></style>
