<template>
  <div class="container my-12">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-9">
        <div
          class="bg-white shadow-lg lg:bg-transparent lg:shadow-transparent lg:border rounded-xl mb-4"
        >
          <div class="p-5">
            <h2 class="text-xl mb-6">انتخاب شیوه پرداخت</h2>

            <p class="text-gray-500 text-sm">
              روش مناسب را جهت پرداخت مبلغ سفارش انتخاب کنید
            </p>

            <div class="mt-6">
              <section
                v-for="(payment_method, index) in payment_methods"
                :key="index"
              >
                <base-radio
                  class="flex items-center bg-blue-100 p-4 cursor-pointer rounded-xl"
                  :value="payment_method.id"
                  v-model="selected_method"
                  :label="payment_method.id"
                  name="payment_method"
                >
                  <div
                    class="flex flex-grow flex-wrap w-full items-center justify-between"
                  >
                    <h4 class="text-blue-600">{{ payment_method.title }}</h4>
                    <p class="text-sm text-gray-500 mr-2">
                      {{ payment_method.description }}
                    </p>
                    <nuxt-icon
                      class="text-blue-600 h-8 w-8 hidden lg:block mr-2"
                      name="online-order"
                    ></nuxt-icon>
                  </div>
                </base-radio>
              </section>
            </div>
          </div>
        </div>
        <div
          class="bg-white shadow-lg lg:bg-transparent lg:shadow-transparent lg:border rounded-xl"
        >
          <div class="flex flex-wrap items-center justify-between p-5">
            <div class="flex items-center">
              <span class="ml-2">
                <nuxt-icon
                  class="text-red-600 h-7 w-7"
                  name="location"
                ></nuxt-icon>
              </span>
              <span class="text-gray-6500">
                {{ address?.address }}
              </span>
            </div>
            <div class="flex items-center flex-wrap">
              <div class="flex items-center ml-3">
                <span class="ml-2">
                  <nuxt-icon
                    class="w-6 h-6 text-gray-500"
                    name="envelope"
                  ></nuxt-icon>
                </span>
                <span>{{ address?.postal_code }}</span>
              </div>
              <div class="flex items-center ml-3">
                <span class="ml-2">
                  <nuxt-icon
                    class="w-6 h-6 text-gray-500"
                    name="user"
                  ></nuxt-icon>
                </span>
                <span>{{ address?.username }}</span>
              </div>

              <div class="flex items-center ml-3">
                <span class="ml-2">
                  <nuxt-icon
                    class="w-6 h-6 text-gray-500"
                    name="mobile"
                  ></nuxt-icon>
                </span>
                <span>{{ address?.mobile }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative col-span-12 lg:col-span-3">
        <div class="space-y-6 sticky top-20">
          <check-out-summary page="payment" :show-voucher="show_voucher">
            <template #continue>
              <base-button @click="handlePayment" block>
                پرداخت و تایید نهایی سفارش
              </base-button>
            </template>
          </check-out-summary>
          <div class="w-full lg:block">
            <div class="relative">
              <div class="relative w-full h-10 rounded-xl">
                <input
                  v-model="voucher_code"
                  placeholder="کد تخفیف را وارد کنید"
                  type="text"
                  class="block w-full h-full outline-none text-right bg-gray-100 transition-all ease-out duration-200 pl-3 pr-12 text-sm rounded-inherit border-2 border-transparent focus:bg-white focus:border-blue-500"
                />

                <div
                  class="absolute inset-y-0 z-10 left-0 top-0 flex items-center justify-center w-16"
                >
                  <div>
                    <button
                      type="submit"
                      class="cursor-pointer"
                      @click="addVoucherCode"
                    >
                      <span class="text-link"> ثبت </span>
                    </button>
                    <button type="button" class="cursor-pointer hidden">
                      <span class="text-danger"> حذف </span>
                    </button>
                  </div>
                </div>

                <div
                  class="absolute inset-y-0 z-10 right-0 top-0 flex items-center justify-center w-16"
                >
                  <div>
                    <nuxt-icon
                      name="gift"
                      class="w-6 h-6 text-gray-500"
                    ></nuxt-icon>
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

<script setup lang="ts">
import CheckOutSummary from "@/modules/checkout/components/share/Summary.vue";
import { ref, onMounted } from "vue";
import { useCartStore } from "@/modules/checkout/store";
import { storeToRefs } from "pinia";

const voucher_code = ref(null);
const selected_method = ref(null);
const payment_methods = ref<Array<any>>([]);
const address = ref<any>({});
const show_voucher = ref(false);

const store = useCartStore();
const { cart } = storeToRefs(store);

const addVoucherCode = () => {
  const formData = {
    code: voucher_code.value,
  };
  useApiService
    .post("voucher/check", formData)
    .then((data) => {
      if (data.success) {
        show_voucher.value = true;
        store.replace({
          shipment_cost: data.data?.shipping_cost,
          payable_price: data.data?.payable_price,
          voucher_discount: data.data?.voucher_discount,
          voucher_code: data.data?.voucher_code,
        });
      }
    })
    .catch(() => {});
};

const handlePayment = () => {
  const formData = {
    payment_method: selected_method.value,
  };
  useApiService
    .post("payment", formData)
    .then((data) => {
      window.location.replace(data.data);
    })
    .catch(() => {});
};

onMounted(() => {
  useApiService
    .get("payment")
    .then((data) => {
      store.fetch(data.data?.cart);
      address.value = data.data.address;
      payment_methods.value = data.data.payment_methods;

      payment_methods.value.map((item) => {
        if (item.is_default) selected_method.value = item.id;
      });

      if (data.data.cart.voucher_discount > 0) {
        show_voucher.value = true;
      }
    })
    .catch(() => {});
});
</script>

<style scoped></style>
