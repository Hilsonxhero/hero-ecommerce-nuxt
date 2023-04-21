<template>
  <div class="container">
    <base-skeleton animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
          <div class="col-span-6">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div class="border rounded-xl p-4">
          <h5 class="text-xl">تاریخچه سفارشات</h5>

          <ul
            class="user-orders__tabs flex overflow-x-auto items-center relative mt-6 pb-2"
          >
            <li
              @click="changeTabStatus(tab)"
              class="user-orders__tab relative px-6 py-2 cursor-pointer flex items-center flex-col"
              :class="{ 'is-active': selected_tab == tab.status }"
              v-for="(tab, index) in tabs"
              :key="index"
            >
              <div class="flex items-center">
                <span
                  class="text-gray-500 user-orders__tab--title whitespace-nowrap"
                  >{{ tab.title }}</span
                >
                <span
                  class="user-orders__tab--count mr-2 px-2 bg-gray-400 rounded text-white"
                  >{{ tab.count }}</span
                >
              </div>
              <div
                v-show="selected_tab == tab.status"
                class="user-orders__tab--border absolute bottom-0"
              ></div>
            </li>
          </ul>

          <ul class="mt-5">
            <li
              class="user-orders__item rounded-lg p-3 mb-3"
              v-for="(order, index) in orders"
            >
              <div>
                <div>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center mb-3">
                      <div>{{ order.status_fa }}</div>
                      <div></div>
                    </div>
                    <nuxt-link
                      :to="{
                        name: 'user-orders-show',
                        params: { id: order.id },
                      }"
                    >
                      <base-button icon variant="gray">
                        <nuxt-icon
                          class="text-gray-500 w-6 h-6"
                          name="arrow-left"
                        >
                        </nuxt-icon>
                      </base-button>
                    </nuxt-link>
                  </div>
                  <div
                    class="flex flex-wrap justify-start items-start user-orders__head pb-2"
                  >
                    <div class="flex items-center ml-2 mb-2">
                      <div class="font-semibold text-gray-700 mr-1">
                        {{ order.create_at }}
                      </div>
                    </div>
                    <div class="flex items-center ml-2 mb-2">
                      <div class="text-gray-400">کد سفارش</div>
                      <div class="font-semibold text-gray-700 mr-1">
                        {{ order.reference_code }}
                      </div>
                    </div>
                    <div class="flex items-center ml-2 mb-2">
                      <div class="text-gray-400">مبلغ</div>
                      <div class="font-semibold text-gray-700 mr-1">
                        {{ $filters.separate(order.price.payable_price) }}
                      </div>
                    </div>
                    <div class="flex items-center ml-2 mb-2">
                      <div class="text-gray-400">تخفیف</div>
                      <div class="font-semibold text-gray-700 mr-1">
                        {{ $filters.separate(order.price.payable_price) }}
                      </div>
                    </div>
                  </div>

                  <ul class="mt-6">
                    <li v-for="(shipment, index) in order.shipments">
                      <div>
                        <div class="mb-3">
                          {{ shipment?.shipment?.title }}
                        </div>
                        <div class="flex flex-wrap items-center">
                          <div
                            class="flex flex-col mb-3 ml-2 border rounded-xl"
                            v-for="(order_item, index) in shipment.order_items"
                          >
                            <router-link
                              :to="{
                                name: 'products-show',
                                params: {
                                  id: order_item?.product.id,
                                  slug: order_item?.product.slug,
                                },
                              }"
                              class="w-24 h-24 lg:w-20 lg:h-20 relative p-2"
                              ><img
                                class="object-contain h-full w-full"
                                :src="order_item?.product?.media?.thumb"
                                alt=""
                            /></router-link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk
import { BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "user",
  middleware: ["auth"],
});

const orders = ref<Array[]>([]);
const tabs = ref([]);
const loading = ref<boolean>(true);
const selected_tab = ref(null);

const changeTabStatus = (tab) => {
  if (selected_tab.value == tab.status) {
    return false;
  } else {
    selected_tab.value = tab.status;
  }
};

watch(
  () => selected_tab.value,
  (val, oldVal) => {
    fetchOrders();
  }
);

const fetchOrders = () => {
  loading.value = true;

  const params = new URLSearchParams();
  params.append(`status`, selected_tab.value);

  useApiService.get("user/orders", { params: params }).then((data) => {
    orders.value = data.data.orders;
    loading.value = false;
  });
};

onMounted(() => {
  // fetchOrders();
  useApiService.get("user/orders/utils/tabs").then((data) => {
    console.log("data", data);
    tabs.value = data.data.tabs;
    selected_tab.value = "progress";
  });
});
</script>

<style scoped></style>
