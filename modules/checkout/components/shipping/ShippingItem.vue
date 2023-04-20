<template>
  <div class="border-b-2 last-of-type:border-transparent py-6">
    <div class="mb-3">
      <h4 class="text-lg text-blue-600">
        {{ package?.submit_type?.title }}
      </h4>
      <p class="text-sm text-gray-400 mt-2">
        {{ package?.submit_type?.description }}
      </p>
    </div>
    <div class="flex flex-wrap items-center">
      <div class="flex items-center ml-2">
        <span class="ml-2">
          <nuxt-icon class="w-6 h-6 text-gray-500" name="package"></nuxt-icon>
        </span>
        <span class="text-sm text-gray-500"
          >سفارش شما از طریق فالکون ارسال می شود</span
        >
      </div>

      <div class="flex items-center ml-2">
        <span class="text-sm text-gray-500">
          مرسوله {{ packageNumber }} ({{ package?.submit_type?.delivery_date }})
        </span>
      </div>

      <div class="flex items-center ml-2">
        <span class="ml-2 text-sm">هزینه ارسال :</span>
        <template v-if="package?.submit_type?.shipping_cost == 0">
          <span class="text-sm text-gray-500"> رایگان </span>
        </template>
        <template v-else>
          <span class="text-sm text-gray-500"
            >{{ $filters.separate(package?.submit_type?.shipping_cost) }}
          </span>
        </template>
      </div>
    </div>

    <div class="flex flex-wrap items-center my-6">
      <div
        class="flex flex-col mb-3 ml-2 border rounded-xl"
        v-for="(cart_item, index) in package?.cart_items"
        :key="index"
      >
        <router-link class="w-24 h-24 lg:w-20 lg:h-20 relative p-2" to="/">
          <img
            class="object-contain h-full w-full"
            :src="cart_item.product?.media?.thumb"
            alt=""
          />
        </router-link>
      </div>
    </div>

    <div v-if="package?.submit_type?.has_interval_scope">
      <div class="thumb-example border p-4 rounded-xl">
        <div class="border-b pb-3">
          <swiper
            class="thumbs-swiper"
            :modules="[Navigation, Thumbs]"
            :space-between="10"
            :breakpoints="config.breakpoints"
            :watch-slides-progress="true"
            :prevent-clicks="false"
            :prevent-clicks-propagation="false"
            @swiper="setThumbsSwiper"
            navigation
          >
            <swiper-slide
              class="shipping-interval__slide"
              v-for="(time, index) in package?.submit_type?.time_scopes"
              :key="index"
            >
              <div class="flex flex-col items-center cursor-pointer">
                <span>{{ time?.weekday_name }}</span>
                <span class="mt-2">{{ time?.day }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <swiper
          class="top-swiper"
          :modules="[Navigation, Thumbs]"
          :space-between="10"
          :slides-per-view="1"
          :thumbs="{ swiper: thumbsSwiper }"
        >
          <swiper-slide
            class="slide"
            v-for="(time, index) in package?.submit_type?.time_scopes"
            :key="index"
          >
            <div class="flex flex-col space-y-3 my-4">
              <base-radio-group v-model="radio">
                <base-radio
                  v-for="interval in time.intervals"
                  :label="{
                    delivery_id: package?.delivery_id,
                    time_scope: interval.id,
                  }"
                  :value="{ time_scope: interval.id }"
                >
                  {{ interval.start_at }}<span class="mx-1">تا</span
                  >{{ interval.end_at }}
                </base-radio>
              </base-radio-group>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk
import { BaseRadioGroup } from "@/components/base/radio";

import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { Navigation, Thumbs } from "swiper";

const props = defineProps({
  package: {
    type: Object,
  },
  packageKey: {
    type: [Number, String],
  },
  packageNumber: {
    type: [Number, String],
  },
});

const emits = defineEmits([UPDATE_MODEL_EVENT, "change"]);

const radio = ref(null);

const config = ref({
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
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "768": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "1024": {
      slidesPerView: 8,
      spaceBetween: 10,
    },
    "1200": {
      slidesPerView: 10,
      spaceBetween: 10,
    },
    "1400": {
      slidesPerView: 10,
      spaceBetween: 10,
    },
  },
});

const thumbsSwiper = ref<any>();

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

watch(radio, (val, prev) => {
  emits("change", val);
});
</script>

<style>
.shipping-interval__slide.swiper-slide-thumb-active {
  color: cornflowerblue;
}
</style>
