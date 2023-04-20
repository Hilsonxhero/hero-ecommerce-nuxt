<template>
  <div class="col-span-12 md:col-span-12 xl:col-span-3 mb-2">
    <div
      class="bg-gray-50 rounded-xl p-4 flex justify-between items-center cursor-pointer"
      @click="openEditUserInfoModal()"
    >
      <div>
        <div
          class="text-blue-600 text-xl text-ellipsis whitespace-nowrap overflow-hidden"
        >
          <div
            class="text-ellipsis whitespace-nowrap overflow-hidden max-w-[90%]"
            v-if="user?.email"
          >
            {{ user?.email }}
          </div>
          <span v-else>ایمیل</span>
        </div>
        <div class="text-sm text-gray-400 mt-1">برای ثبت کلیک کنید</div>
      </div>
      <div>
        <nuxt-icon name="arrow-left" class="w-6 h-6 text-gray-500"></nuxt-icon>
      </div>
    </div>

    <base-dialog v-model="active" title="ویرایش اطلاعات کاربری">
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <base-form-group label="ایمیل">
          <base-form-item
            mode="passive"
            prop="email"
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
              v-model="form.email"
              placeholder="ایمیل را وارد کنید"
            ></base-input>
          </base-form-item>
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
    await useApiService.post("user/profile/update/email", data);
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

const openEditUserInfoModal = () => {
  active.value = true;
};
</script>

<style scoped></style>
