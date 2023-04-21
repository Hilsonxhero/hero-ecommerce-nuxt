<template>
  <div class="hx-product__item col-span-12 md:col-span-4 lg:col-span-3">
    <div class="relative overflow-hidden bg-gray-100 w-full rounded-xl p-2">
      <nuxt-link
        :to="{
          name: 'products-show',
          params: {
            id: product?.id,
            slug: product?.slug,
          },
        }"
      >
        <div class="flex justify-between">
          <div class="t-percent">
            <span class="text-sm">{{
              product?.default_variant?.discount
            }}</span>
            <nuxt-icon
              class="mr-2 text-white w-4 h-4"
              name="percentage-square"
            ></nuxt-icon>
          </div>
        </div>
        <img
          class="w-[9.25rem] h-[9.25rem] mx-auto object-contain"
          :src="product?.media?.thumb"
          alt=""
        />

        <div class="flex justify-between pb-2 px-2 w-full lg:pb-0">
          <div
            class="flex items-center p-2 max-w-max h-5 bg-gray-300 space-x-1 space-x-reverse rounded-[0.375rem]"
          >
            <div
              class="mr-auto w-[0.375rem] h-[0.375rem] rounded-full"
              style="background-color: #000000"
            ></div>
            <div
              class="mr-auto w-[0.375rem] h-[0.375rem] rounded-full"
              style="background-color: #fff"
            ></div>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div class="mt-3">
      <nuxt-link to="/" class="ellipsis-2">
        <h2 class="h-[39px]">{{ product?.title_fa }}</h2>
      </nuxt-link>
    </div>
    <div class="flex flex-col items-center">
      <div class="mt-2 text-gray-500">
        <del class="">
          <!-- {{ $filters.separate(product?.default_variant?.rrp_price) }} -->
          2323232323
        </del>
      </div>
      <div class="mt-2 text-gray-500">
        <span class="">
          <!-- {{ $filters.separate(product?.default_variant?.selling_price) }} -->
          2323232323
        </span>
        <span class="mr-1">تومان</span>
      </div>
    </div>
    <div class="mt-3">
      <!-- <Countdown
        v-if="product.discount_diff_seconds"
        class="text-sm font-normal heading-color-gradiernt"
        :date="product?.discount_diff_seconds"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk

// import Countdown from "@/components/common/countdown.vue";
const props = defineProps({
  product: {},
});

const discount_expire = ref(9000 * 1000);
</script>

<style lang="scss" scoped>
.hx-product__item {
  @apply bg-white hover:shadow-design-base transition-shadow duration-200 ease-in-out flex flex-col items-center rounded-xl p-2 relative;
}

.t-percent {
  height: 1.75rem;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  border-radius: 0.375rem;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 106, 106, 1);
  padding-left: 0.25rem;
  padding-right: 0.5rem;
  color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
