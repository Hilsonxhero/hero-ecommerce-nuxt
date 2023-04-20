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

    <base-dialog
      :show="active"
      title="ویرایش اطلاعات کاربری"
      @close="active = !active"
    >
      <base-form ref="form" class="h-full space-y-6" @submit="update">
        <template v-if="user.has_password">
          <base-form-group label="رمز عبور فعلی">
            <base-form-item
              prop="current_password"
              v-slot="{ field }"
              :rules="[
                {
                  required: true,
                  message: ' متن پرسش الزامی می باشد',
                },
              ]"
              label="رمز عبور فعلی"
            >
              <base-input
                v-bind="field"
                v-model="current_password"
                placeholder="رمز عبور فعلی را وارد کنید"
              ></base-input>
            </base-form-item>
            <div class="invalid-feedback d-block"></div>
          </base-form-group>
        </template>

        <base-form-group label="رمز عبور جدید">
          <base-form-item
            prop="password"
            v-slot="{ field }"
            :rules="[
              {
                required: true,
                message: ' متن پرسش الزامی می باشد',
              },
            ]"
            label="رمز عبور جدید"
          >
            <base-input
              v-bind="field"
              v-model="password"
              placeholder="رمز عبور جدید را وارد کنید"
            ></base-input>
          </base-form-item>
          <div class="invalid-feedback d-block"></div>
        </base-form-group>

        <base-form-group label="تکرار رمز عبور جدید">
          <base-form-item
            prop="confirmation"
            v-slot="{ field }"
            :rules="[
              {
                required: true,
                message: ' متن پرسش الزامی می باشد',
              },
            ]"
            label="تکرار رمز عبور جدید"
          >
            <base-input
              v-bind="field"
              v-model="password_confirmation"
              placeholder="تکرار رمز عبور را وارد کنید"
            ></base-input>
          </base-form-item>
          <div class="invalid-feedback d-block"></div>
        </base-form-group>
        <div class="text-right mt-4">
          <base-button type="submit" :loading="loader">ثبت</base-button>
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
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/modules/user/store";
import { BaseForm, BaseFormItem, BaseFormGroup } from "@/components/base/form";
import { storeToRefs } from "pinia";
import BaseMessage from "@/components/base/message";
const emit = defineEmits(["update", "close"]);
const store = useUserStore();
const { user } = storeToRefs(store);
const current_password = ref<any>(null);
const password = ref<any>(null);
const password_confirmation = ref<any>(null);
const loader = ref<boolean>(false);
const form = ref(null);
const active = ref<boolean>(false);
const update = async () => {
  const data = {
    current_password: current_password.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  };
  try {
    loader.value = true;
    const { data: response } = await useApiService.post(
      "user/profile/update/password",
      data
    );
    loader.value = false;
    active.value = false;
    current_password.value = "";
    password.value = "";
    password_confirmation.value = "";
    // HxNotification.success({
    //   title: "ویرایش مشخصات کاربری",
    //   message: "عملیات ویرایش با موفقیت انجام شد",
    //   showClose: true,
    //   duration: 3000,
    //   position: "bottom-center",
    // });
    store
      .personalInfo()
      .then(() => {})
      .catch((e) => {});
  } catch ({ response }) {
    loader.value = false;
    // form.value.setErrors(response.data.data);
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
