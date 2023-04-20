<template>
  <div>
    <base-form :model="form" ref="formRef" class="h-full space-y-6">
      <base-form-item
        prop="phone"
        :rules="[
          {
            required: true,
            message: ' متن پرسش الزامی می باشد',
          },
        ]"
        label="شماره موبایل"
      >
        <base-input
          v-model="form.phone"
          placeholder="شماره موبایل را وارد کنید"
        ></base-input>
      </base-form-item>
      <div class="text-right mt-4">
        <base-button @click="request" :loading="loader">ثبت</base-button>
        <base-button variant="light" class="mr-1" @click="cancel"
          >لغو</base-button
        >
      </div>
    </base-form>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk
import { BaseForm, BaseFormItem, BaseFormGroup } from "@/components/base/form";
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
const emit = defineEmits(["update", "close", UPDATE_MODEL_EVENT]);
const store = useUserStore();
const { user } = storeToRefs(store);
// const phone = ref<any>(store?.user?.phone);
const loader = ref<boolean>(false);
const formRef = ref(null);
// const ttl_time = ref<any>(0);
const error = ref<any>(null);
const show = inject<any>("show", false);
const form = ref({
  phone: store?.user?.phone,
  ttl_time: 0,
});

const request = async () => {
  const formData = {
    phone: form.value.phone,
  };
  loader.value = true;
  try {
    const data = await useApiService.post(
      "user/profile/update/mobile/request",
      formData
    );
    console.log("data", data);

    // resend.value = false;
    loader.value = false;
    if (data.success) {
      show.value = true;
      form.value.ttl_time = data.data.ttl * 1000;
      emit(UPDATE_MODEL_EVENT, form.value);
    }
  } catch ({ response }) {
    loader.value = false;
    error.value = response.data.data;
  }
};

watchEffect(() => {});

const cancel = () => {
  emit("close", true);
};
</script>

<style scoped></style>
