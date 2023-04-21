<template>
  <div class="container">
    <div class="flex justify-center"></div>
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
        <div class="border rounded-xl">
          <div
            class="flex flex-wrap items-center justify-between border-b border-gray-600 p-3"
          >
            <div class="aa flex items-center">
              <base-button
                class="ss inline-block"
                icon
                variant="gray"
                :to="{
                  name: 'user-orders-index',
                }"
              >
                <nuxt-icon class="text-gray-500 w-5 h-5" name="arrow-right-av">
                </nuxt-icon>
              </base-button>
              <h5 class="lg:text-xl mr-1 ss inline-block">جزئیات سفارش</h5>
            </div>

            <div>
              <div
                class="flex items-center justify-center cursor-pointer"
                @click="convertToPDF"
              >
                <nuxt-icon
                  class="text-blue-500 w-4 h-4 lg:w-5 lg:h-5"
                  name="archive-book"
                >
                </nuxt-icon>

                <span
                  class="text-xs text-center lg:text-base mr-1 text-blue-600 leading-normal h-auto"
                >
                  مشاهده فاکتور
                </span>
              </div>
            </div>
          </div>
          <div ref="invoiceRef" id="ssss">
            <div class="p-3 border-b mb-3">
              <div
                class="flex flex-wrap space-y-2 lg:space-y-0 justify-start items-start space-x-reverse lg:space-x-2 pb-3"
              >
                <div class="flex items-center">
                  <div class="text-gray-400">تاریخ ثبت سفارش</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ order.create_at }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="text-gray-400">کد پیگیری سفارش</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ order.reference_code }}
                  </div>
                </div>
              </div>

              <div
                class="flex flex-wrap space-y-2 lg:space-y-0 justify-start items-start space-x-reverse lg:space-x-2"
              >
                <div class="flex items-center">
                  <div class="text-gray-400">تحویل گیرنده</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ order.user?.username }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="text-gray-400">شماره موبایل</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ order.user?.phone }}
                  </div>
                </div>

                <div class="flex items-center mr-2">
                  <div class="text-gray-400">آدرس</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ order.address?.address }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-3 border-b border-grat-600 mb-3">
              <div
                class="flex flex-wrap justify-start items-start space-x-reverse"
              >
                <div class="flex items-center ml-2">
                  <div class="text-gray-400">مبلغ</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ $filters.separate(order.price.payable_price) }}
                  </div>
                </div>
                <div class="flex items-center ml-2">
                  <div class="text-gray-400">سود شما از خرید</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ $filters.separate(order.price.payable_price) }}
                  </div>
                </div>

                <div class="flex items-center ml-2">
                  <div class="text-gray-400">نوع پرداخت</div>
                  <div class="font-semibold text-gray-700 mr-1">
                    {{ order?.payment_method?.title }}
                  </div>
                </div>
              </div>
            </div>

            <div class="p-3">
              <div
                class="border rounded-lg p-3 mb-3"
                v-for="(shipment, index) in order.shipments"
                :key="index"
              >
                <div class="mb-3">
                  <div class="flex items-center">
                    <div class="ml-4">
                      مرسوله {{ index + 1 }} از {{ order.shipments.length }}
                    </div>
                    <div>{{ shipment.shipment?.title }}</div>
                  </div>
                </div>
                <div class="mb-3">
                  <div
                    class="flex justify-start items-start space-x-reverse space-x-2"
                  >
                    <div class="flex items-center">
                      <div class="text-gray-400">زمان تحویل</div>
                      <div class="font-semibold text-gray-700 mr-1">
                        {{ shipment.date }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="flex flex-wrap items-center justify-between">
                    <div
                      class="flex flex-wrap justify-start items-start space-x-reverse"
                    >
                      <div class="flex items-center ml-2">
                        <div class="text-gray-400">هزینه ارسال</div>
                        <div class="font-semibold text-gray-700 mr-1">
                          <span v-if="shipment.shipment?.shipping_cost == 0"
                            >رایگان</span
                          >
                          <span v-else>{{
                            $filters.separate(shipment.shipment?.shipping_cost)
                          }}</span>
                        </div>
                      </div>
                      <div class="flex items-center ml-2">
                        <div class="text-gray-400">مبلغ مرسوله</div>
                        <div class="font-semibold text-gray-700 mr-1">
                          {{ $filters.separate(shipment.order_items_cost) }}
                        </div>
                      </div>
                    </div>
                    <div class="flex-grow mt-2 lg:mt-0">
                      <div class="flex items-center">
                        <div class="text-gray-400">کد پیگیری مرسوله</div>
                        <div class="font-semibold text-gray-700 mr-1">
                          {{ shipment.reference_code }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="(product, index) in shipment.order_items"
                  :key="index"
                >
                  <div class="grid grid-cols-12 gap-2 lg:gap-4 my-5">
                    <div class="col-span-4 lg:col-span-2">
                      <router-link
                        :to="{
                          name: 'products-show',
                          params: {
                            id: product?.product.id,
                            slug: product?.product.slug,
                          },
                        }"
                      >
                        <div class="lg:h-20 lg:w-20">
                          <img
                            class="object-contain w-full"
                            :src="product?.product.media?.base64_encode"
                            alt=""
                          />
                        </div>
                      </router-link>
                    </div>

                    <div class="col-span-8 lg:col-span-10">
                      <h4 class="text-gray-700 text-sm">
                        {{ product?.product.title_fa }}
                      </h4>

                      <div
                        class="flex flex-col lg:flex-row lg:items-center my-4"
                      >
                        <div
                          class="flex items-center lg:mr-2"
                          v-for="(combination, index) in product?.variant
                            ?.combinations"
                        >
                          <nuxt-icon
                            name="cube-scan-bulk"
                            class="w-6 h-6"
                          ></nuxt-icon>

                          <div
                            class="mr-2 text-gray-500 text-sm invoice-title-align"
                          >
                            {{ combination.label }}
                          </div>
                        </div>

                        <div class="flex items-center lg:mr-2">
                          <span class="">
                            <nuxt-icon
                              class="text-gray-500 w-6 h-6 lg:w-6 lg:h-6"
                              name="shield-tick"
                            ></nuxt-icon>
                          </span>
                          <span
                            class="mr-2 text-gray-500 text-sm invoice-title-align"
                          >
                            {{ product?.variant?.warranty?.title }}
                          </span>
                        </div>

                        <div class="flex items-center lg:mr-2">
                          <span class="">
                            <nuxt-icon
                              class="text-gray-500 w-6 h-6 lg:w-6 lg:h-6"
                              name="store"
                            ></nuxt-icon>
                          </span>
                          <span
                            class="mr-2 text-gray-500 text-sm invoice-title-align"
                            >فالکون</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "user",
  middleware: ["auth"],
});

const order = ref<any>({});
const tabs = ref([]);
const loading = ref<boolean>(true);
const order_id = ref(null);
const route = useRoute();
const invoiceRef = ref(null);

const fetchOrder = () => {
  loading.value = true;

  useApiService.get(`user/orders/${order_id.value}`).then((data) => {
    order.value = data.data;
    loading.value = false;
  });
};

const convertToPDF = () => {
  const element = invoiceRef.value.cloneNode(true);
  element.classList.add("invoice-container");
  var opt = {
    margin: 0,
    filename: `${order.value.reference_code}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: "in", format: "a4", orientation: "p" },
  };
  const { $html2pdf } = useNuxtApp();
  $html2pdf(element, opt);
};

onMounted(() => {
  order_id.value = route.params.id;
  fetchOrder();
});
</script>

<style scoped></style>
