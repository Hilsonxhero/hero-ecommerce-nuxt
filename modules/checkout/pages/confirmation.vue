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
        <div class="text-center text-3xl py-6">
          <div class="mb-4 flex flex-col items-center">
            <div>
              <nuxt-icon
                name="verify"
                class="w-16 h-16 text-green-500"
                v-if="checkout.status == 'success'"
              ></nuxt-icon>
              <nuxt-icon
                name="close-square"
                class="w-16 h-16 text-red-500"
                v-else
              ></nuxt-icon>
            </div>
            <div>
              <h2
                class="text-lg text-gray-700"
                v-if="checkout.status == 'success'"
              >
                پرداخت سفارش شما با موفقیت انجام شد
              </h2>
              <h2 class="text-lg text-gray-700" v-else>
                پرداخت سفارش شما انجام نشد
              </h2>
            </div>

            <div>
              <p
                class="text-sm text-gray-400 my-6"
                v-if="checkout.status == 'success'"
              >
                پرداخت شما با موفقیت انجام شد، برای مشاهده و پیگیری سفارش از
                قسمت پروفایل و سفارشات دنبال کنید
              </p>
              <p class="text-sm text-gray-400 my-6" v-else>
                پرداخت شما با مشکل روبرو شد. لطفا مجددا جهت پرداخت اقدام کنید.
                کالاهای شما به مدت یک ساعت برای شما رزرو میمانند و درصورت عدم
                پرداخت سفارش شما لغو میشود
              </p>
            </div>
            <h4 class="text-base text-gray-600">
              شماره سفارش : {{ checkout?.order?.reference_code }}
            </h4>
          </div>

          <div class="inline-flex mb-8">
            <div class="flex flex-col space-y-6">
              <base-button>انتقال به درگاه و پرداخت مجدد</base-button>
              <base-button
                outlined
                :to="{
                  name: 'user profile orders show',
                  params: { id: checkout?.order?.id },
                }"
                >جزئیات سفارش</base-button
              >
            </div>
          </div>
        </div>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { BaseSkeletonItem } from "@/components/base/skeleton";

const checkout = ref<any>({});
const route = useRoute();
const loading = ref<boolean>(true);

onMounted(() => {
  const formData = {
    reference_code: route.params.id,
  };

  useApiService
    .post("payment/checkout", formData)
    .then((data) => {
      checkout.value = data.data;
      loading.value = false;
    })
    .catch(() => {});
});
</script>

<style scoped></style>
