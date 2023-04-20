<template>
  <div class="col-span-12 md:col-span-12 xl:col-span-3 mb-2">
    <div
      class="bg-gray-50 rounded-xl p-4 flex justify-between items-center cursor-pointer"
      @click="openEditUserInfoModal()"
    >
      <div>
        <div class="text-blue-600 text-xl">
          <span v-if="user?.username">{{ user?.username }}</span>
          <span v-else>نام کاربری</span>
        </div>
        <div class="text-sm text-gray-400 mt-1">برای ثبت کلیک کنید</div>
      </div>
      <div>
        <nuxt-icon name="arrow-left" class="w-6 h-6 text-gray-500"></nuxt-icon>
      </div>
    </div>

    <base-dialog v-model="active" title="ویرایش اطلاعات کاربری">
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <base-form-item
          prop="username"
          :rules="[
            {
              required: true,
              message: ' متن پرسش الزامی می باشد',
            },
          ]"
          label="نام کاربری"
        >
          <base-input
            v-model="form.username"
            placeholder="نام کاربری را وارد کنید"
          ></base-input>
        </base-form-item>
        <div class="text-right mt-4">
          <base-button @click="update" :loading="loader">ثبت</base-button>
          <base-button variant="light" class="mr-1" @click="active = false"
            >لغو</base-button
          >
        </div>
      </base-form>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk
import { BaseForm, BaseFormItem, BaseFormGroup } from "@/components/base/form";
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";
import BaseMessage from "@/components/base/message";

const emit = defineEmits(["update", "close"]);
const store = useUserStore();
const { user } = storeToRefs(store);

const loader = ref<boolean>(false);
const formRef = ref(null);
const form = ref({
  username: store.user.username,
});
const active = ref<boolean>(false);
const update = async () => {
  const data = {
    username: form.value.username,
  };
  try {
    loader.value = true;
    await useApiService.post("user/profile/update/username", data);
    loader.value = false;
    active.value = false;

    BaseMessage({
      message: "عملیات ویرایش با موفقیت انجام شد",
      type: "success",
      duration: 4000,
      center: true,
    });
    store
      .personalInfo()
      .then(() => {})
      .catch((e) => {});
  } catch (error) {
    loader.value = false;
  }
};

watchEffect(() => {
  if (form.value) {
  }
});

const openEditUserInfoModal = () => {
  active.value = true;
};
</script>

<style scoped></style>
