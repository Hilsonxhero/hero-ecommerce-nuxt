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

    <hx-modal
      :show="active"
      title="ویرایش اطلاعات کاربری"
      @close="active = !active"
    >
      <base-form ref="form" class="h-full space-y-6" @submit="update">
        <base-form-group label="نام کاربری">
          <base-form-item
            mode="passive"
            prop="username"
            v-slot="{ field }"
            :rules="[
              {
                required: true,
                message: ' متن پرسش الزامی می باشد',
              },
            ]"
            label="نام کاربری"
          >
            <base-input
              v-bind="field"
              v-model="username"
              placeholder="نام کاربری را وارد کنید"
            ></base-input>
          </base-form-item>
          <div class="invalid-feedback d-block"></div>
        </base-form-group>
        <div class="text-right mt-4">
          <base-button type="submit" :loading="loader">ثبت</base-button>
          <bae-button variant="light" class="mr-1" @click="active = false"
            >لغو</bae-button
          >
        </div>
      </base-form>
    </hx-modal>
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
const username = ref<any>(store.user.username);
const loader = ref<boolean>(false);
const form = ref(null);
const active = ref<boolean>(false);
const update = async () => {
  const data = {
    username: username.value,
  };
  try {
    loader.value = true;
    await useApiService.post("user/profile/update/username", data);
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
