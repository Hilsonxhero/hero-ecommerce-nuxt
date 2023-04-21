<template>
  <div class="container">
    <section class="my-10" v-for="(category, index) in categories">
      <div class="flex items-center justify-between my-6">
        <h4>{{ category.title }}</h4>
        <div>
          <base-button size="sm" outlined variant="primary"
            >مشاهده همه</base-button
          >
        </div>
      </div>
      <swiper :breakpoints="config.breakpoints">
        <swiper-slide v-for="(sub, index) in category.children">
          <nuxt-link
            to="/"
            class="flex flex-col items-center p-5 bg-gray-100 rounded-xl border-2 border-transparent hover:border-2 hover:border-gray-200 transition-all duration-200 ease-in-out"
          >
            <div class="overflow-hidden max-w-[6rem] mix-blend-multiply">
              <img
                class="w-[9.25rem] h-[9.25rem] object-contain"
                :src="sub?.media?.thumb"
                loading="lazy"
                alt=""
              />
            </div>
            <div class="my-2 flex flex-col items-center">
              <h4 class="text-gray-600 text-center">{{ sub.title }}</h4>
              <p class="mt-3 text-sm text-gray-400">
                {{ sub.products_count }} کالا
              </p>
            </div>
          </nuxt-link>
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<script setup lang="ts">
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
      slidesPerView: 6,
      spaceBetween: 10,
    },
    "1400": {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
});

const categories = ref<Array<any>>([]);

onMounted(() => {
  useApiService.get("categories").then((data) => {
    categories.value = data.data;
  });
});
</script>

<style scoped></style>
