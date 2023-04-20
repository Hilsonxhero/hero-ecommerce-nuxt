<template>
  <div class="col-span-12 md:col-span-12 xl:col-span-3 mb-2">
    <div
      class="bg-gray-50 rounded-xl p-4 flex justify-between items-center cursor-pointer"
      @click="openEditUserInfoModal()"
    >
      <div>
        <div class="text-blue-600 text-xl">
          <span v-if="user?.email">{{ user?.email }}</span>
          <span v-else>ایمیل</span>
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
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <base-form-group label="ایمیل">
          <base-form-item
            mode="passive"
            prop="email"
            v-slot="{ field }"
            :rules="[
              {
                required: true,
                message: ' متن پرسش الزامی می باشد',
              },
            ]"
            label="ایمیل"
          >
            <base-input
              type="email"
              v-bind="field"
              v-model="form.email"
              placeholder="ایمیل را وارد کنید"
            ></base-input>
          </base-form-item>
          <div class="invalid-feedback d-block">
            <ErrorMessage name="email" />
          </div>
        </base-form-group>
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
// const email = ref<any>(store.user.email);
const loader = ref<boolean>(false);
const formRef = ref(null);
const form = ref({
  email: store.user.email,
});
const active = ref<boolean>(false);
const update = async () => {
  const data = {
    email: form.value.email,
  };
  try {
    loader.value = true;
    await ApiService.post("user/profile/update/email", data);
    loader.value = false;
    active.value = false;
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
  } catch (error) {
    loader.value = false;
    console.error;
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
