<template>
  <div>
    <div class="sticky top-36">
      <div class="border p-5 rounded-xl">
        <div class="text-gray-600 text-center mb-6">سفارش شما</div>
        <div class="flex flex-col space-y-6 border-b-2 pb-6">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">مبلغ کالا ها</span>
            <span> {{ $filters.separate(cart?.rrp_price) }} تومان</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">تخفیف کالاها</span>
            <span class="text-red-500">
              {{ $filters.separate(cart?.items_discount) }} تومان</span
            >
          </div>

          <div class="flex items-center justify-between" v-if="showVoucher()">
            <span class="text-gray-600">کد تخفیف</span>
            <span class="text-red-500">
              {{ $filters.separate(cart?.voucher_discount) }} تومان</span
            >
          </div>

          <div class="flex items-center justify-between" v-if="showShipment()">
            <span class="text-gray-600">هزینه ارسال</span>
            <span class=""
              >{{ $filters.separate(cart?.shipment_cost) }} تومان</span
            >
          </div>
        </div>

        <div class="pt-6">
          <div class="flex items-center justify-between">
            <span class="text-gray-500">مبلغ قابل پرداخت</span>
            <span class=""
              >{{ $filters.separate(cart?.payable_price) }} تومان</span
            >
          </div>
          <div class="mt-6 hidden lg:block">
            <slot name="continue"></slot>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div class="sticky z-20 bottom-[3.77rem] inset-x-0">
        <section
          class="px-4 py-3 bg-white shadow-design lg:px-0 lg:py-0 lg:shadow-none lg:bg-unset lg:hidden"
        >
          <div
            class="flex flex-row-reverse items-center justify-between lg:flex-col lg:items-start lg:justify-start lg:space-y-4"
          >
            <section class="flex">
              <div
                class="flex flex-col lg:space-y-4 lg:flex-col-reverse lg:space-y-reverse justify-evenly"
              >
                <span class="hidden text-sm font-medium lg:block">قیمت</span>
                <div>
                  <span class="flex items-center font-bold">
                    <span
                      id="price"
                      class="text-base text-left min-w-[4.5rem] min-h-[1.625rem] font-bold leading-6 lg:text-xl"
                    >
                      {{ $filters.separate(cart?.payable_price) }}
                    </span>
                    <span class="font-normal text-sm leading-6 lg:text-sm mr-2"
                      >تومان</span
                    >
                  </span>
                </div>
              </div>
            </section>
            <section class="w-full ml-3">
              <!-- <base-button block> ادامه </base-button> -->
              <slot name="continue"></slot>
            </section>
          </div>
        </section>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
//@ts-nocheck
import { useCartStore } from "@/modules/checkout/store";
import { storeToRefs } from "pinia";

const props = defineProps({
  page: {},
  showVoucher: {
    type: Boolean,
    default: false,
  },
});

const store = useCartStore();
const { cart } = storeToRefs(store);

const showShipment = () => {
  if (props.page == "cart") return false;
  return true;
};

const showVoucher = () => {
  if (props.page == "payment" && props.showVoucher) return true;
  return false;
};
</script>

<style scoped></style>
