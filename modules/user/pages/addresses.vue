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
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-12 md:col-span-4 border-2 rounded-xl p-4"
            v-for="(address, index) in addresses"
            :key="index"
          >
            <h4 class="text-gray-700 text-sm min-h-[2.5rem] ellipsis-2">
              {{ address.address }}
            </h4>
            <div class="grid grid-cols-12 mt-3">
              <div class="col-span-6 flex items-center mb-3">
                <div>
                  <nuxt-icon
                    name="user-circle"
                    class="w-6 h-6 text-gray-500"
                  ></nuxt-icon>
                </div>
                <div class="text-gray-700 mr-2">{{ address.username }}</div>
              </div>
              <div class="col-span-12 md:col-span-6 flex items-center mb-3">
                <div>
                  <nuxt-icon
                    name="phone"
                    class="w-6 h-6 text-gray-500"
                  ></nuxt-icon>
                </div>
                <div class="text-gray-700 mr-2">{{ address.mobile }}</div>
              </div>
              <div class="col-span-6 flex items-center mb-3">
                <div>
                  <nuxt-icon
                    name="envelope"
                    class="w-6 h-6 text-gray-500"
                  ></nuxt-icon>
                </div>
                <div class="text-gray-700 mr-2">{{ address.postal_code }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4 bg-gray-100 rounded-xl p-4">
            <div class="flex">
              <div class="flex h-full flex-col">
                <h4 class="text-xl">آدرس های شما</h4>
                <p class="mt-3 h-full grow">
                  برای ارسال کالا به آدرس انتخابی شما میتوانید آدرس های خود را
                  اینجا ثبت کنید
                </p>
                <div class="mt-3">
                  <base-button @click="dialog_visible = true"
                    >افزودن آدرس جدید</base-button
                  >
                </div>
              </div>
              <div>
                <nuxt-icon name="address" class="w-full h-full"></nuxt-icon>
              </div>
            </div>
          </div>
          <!-- <Create @create="fetch()" /> -->
        </div>
      </template>
    </base-skeleton>
    <Create @create="fetch()" v-model="dialog_visible" />
  </div>
</template>

<script setup lang="ts">
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import BaseMessage from "@/components/base/message";
import Create from "@/modules/user/components/profile/address/create.vue";

definePageMeta({
  layout: "user",
  middleware: ["auth"],
});

interface Address {
  mobile: string;
  address: string;
  username: string;
  postal_code: string;
}

const loading = ref<boolean>(true);
const addresses = ref<Address[]>([]);
const dialog_visible = ref(false);

const fetch = () => {
  loading.value = true;
  useApiService.get("user/profile/addresses").then((data) => {
    addresses.value = data.data;
    loading.value = false;
  });
};

onMounted(() => {
  fetch();
});
</script>

<style scoped></style>
