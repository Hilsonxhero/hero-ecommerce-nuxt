<template>
  <div class="col-span-12 md:col-span-12 xl:col-span-3 mb-2">
    <div
      class="bg-gray-50 rounded-xl p-4 flex justify-between items-center cursor-pointer"
      @click="openEditUserInfoModal()"
    >
      <div>
        <div class="text-blue-600 text-xl">
          <span>رمز عبور</span>
        </div>
        <div class="text-sm text-gray-400 mt-1">برای ثبت کلیک کنید</div>
      </div>
      <div>
        <nuxt-icon name="arrow-left" class="w-6 h-6 text-gray-500"></nuxt-icon>
      </div>
    </div>

    <base-dialog v-model="active" title="ویرایش اطلاعات کاربری">
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <template v-if="user.has_password">
          <base-form-item
            prop="current_password"
            :rules="[
              {
                required: true,
                message: ' متن پرسش الزامی می باشد',
              },
            ]"
            label="رمز عبور فعلی"
          >
            <base-input
              type="password"
              v-model="form.current_password"
              placeholder="رمز عبور فعلی را وارد کنید"
            ></base-input>
          </base-form-item>
        </template>

        <base-form-item
          prop="password"
          :rules="[
            {
              required: true,
              message: ' متن پرسش الزامی می باشد',
            },
          ]"
          label="رمز عبور جدید"
        >
          <base-input
            type="password"
            v-model="form.password"
            placeholder="رمز عبور جدید را وارد کنید"
          ></base-input>
        </base-form-item>

        <base-form-item
          prop="password_confirmation"
          :rules="[
            {
              required: true,
              message: ' متن پرسش الزامی می باشد',
            },
          ]"
          label="تکرار رمز عبور جدید"
        >
          <base-input
            type="password"
            v-model="form.password_confirmation"
            placeholder="تکرار رمز عبور را وارد کنید"
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

import { useUserStore } from "@/modules/user/store";
import { BaseForm, BaseFormItem, BaseFormGroup } from "@/components/base/form";
import { storeToRefs } from "pinia";
import BaseMessage from "@/components/base/message";
const emit = defineEmits(["update", "close"]);
const store = useUserStore();
const { user } = storeToRefs(store);

const loader = ref<boolean>(false);
const formRef = ref(null);
const form = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});
const active = ref<boolean>(false);
const update = async () => {
  const formData = {
    current_password: form.value.current_password,
    password: form.value.password,
    password_confirmation: form.value.password_confirmation,
  };
  try {
    loader.value = true;
    const data = await useApiService.post(
      "user/profile/update/password",
      formData
    );
    loader.value = false;
    active.value = false;
    form.value.current_password = "";
    form.value.password = "";
    form.value.password_confirmation = "";
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
  } catch ({ response }) {
    loader.value = false;
    // form.value.setErrors(response.data.data);
  }
};

const openEditUserInfoModal = () => {
  active.value = true;
};
</script>

<style scoped></style>
