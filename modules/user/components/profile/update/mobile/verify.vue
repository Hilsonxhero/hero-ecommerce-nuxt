<template>
  <div>
    <base-form
      :model="form"
      ref="formRef"
      class="h-full space-y-6"
      @submit="update"
    >
      <div class="flex items-center">
        <base-otp :length="5" v-model="code"></base-otp>
        <div mode="out-in" class="flex flex-col justify-center mr-6 w-56">
          <Countdown v-if="!resend" :date="ttl_time" @finish="resend = true" />
          <div
            @click="handleresendCode"
            v-else
            class="inline-block text-xs cursor-pointer text-typo-light font-medium"
          >
            ارسال مجدد
          </div>
        </div>
      </div>
      <div class="text-right mt-4">
        <base-button type="submit" :loading="loader">ثبت</base-button>
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
import Countdown from "@/components/common/countdown.vue";

const props = defineProps({
  data: {
    type: Object,
  },
});

const emit = defineEmits(["update", "close"]);
const store = useUserStore();
const { user } = storeToRefs(store);
const loader = ref<boolean>(false);
const requestForm = ref(null);
const show = inject<any>("show", false);
const resend = ref<boolean>(false);
const ttl_time = ref<any>(props.data.ttl_time);
const error = ref<any>(null);
const formRef = ref(null);
const form = ref({
  phone: props.data.phone,
  code: "",
});
const update = async () => {
  const formData = {
    phone: form.value.phone,
    code: form.value.code,
  };
  try {
    loader.value = true;
    const { data } = await useApiService.post(
      "user/profile/update/mobile/verify",
      formData
    );
    loader.value = false;
    if (data.success) {
      show.value = false;
      emit("update", form.value.phone);
    } else {
      // formRef.value.setErrors(data.data);
    }
  } catch (error) {
    loader.value = false;
    console.error;
  }
};

const handleresendCode = async () => {
  loader.value = true;
  const form = {
    phone: form.value.phone,
  };
  try {
    const { data } = await store.authenticate(form);
    ttl_time.value - data.ttl * 1000;
    resend.value = false;
    loader.value = false;
  } catch (error) {
    loader.value = false;
  }
};

watchEffect(() => {
  if (requestForm.value) {
  }
});

const cancel = () => {
  emit("close", true);
};
</script>

<style scoped></style>
