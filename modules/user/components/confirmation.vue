<template>
  <div>
    <h1 class="flex justify-start mb-6 text-typo text-xl">ورود</h1>
    <div class="w-full">
      <base-form :model="form" ref="formRef" class="h-full space-y-6">
        <div class="block mb-4">
          <base-form-item
            :model="form"
            v-slot="{ field }"
            prop="username"
            :rules="[
              {
                required: true,
                message: ' عنوان نظر الزامی می باشد',
              },
            ]"
            label="عنوان"
            class="col-span-12"
          >
            <base-input
              v-bind="field"
              v-model="form.username"
              placeholder="شماره موبایل"
            ></base-input>
          </base-form-item>
          <!-- <base-input
            v-model="form.username"
            placeholder="عنوان نظر"
          ></base-input> -->
        </div>
        <span class="text-justify lg:text-xs text-typo-400">
          با ورود به ،
          <a class="cursor-pointer"><span class="text-link"> شرایط </span></a>
          و

          <a class="cursor-pointer"
            ><span class="text-link"> قوانین حریم ‌خصوصی </span></a
          >

          آن را می‌پذیرید.
        </span>

        <div
          class="border-gray-300 border lg:auth-content-reverse-padding"
        ></div>
        <div class="flex flex-col justify-between lg:items-center">
          <div class="w-full">
            <base-button
              @click="handleSubmit"
              :loading="loader"
              variant="primary"
              block
              >ورود</base-button
            >
          </div>
        </div>
      </base-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { useUserStore } from "@/modules/user/store";
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";

const store = useUserStore();
const emit = defineEmits([UPDATE_MODEL_EVENT, "change"]);

const otp = ref(false);
const loader = ref(false);
const formRef = ref(null);
const form = ref({
  username: "",
});
const end = ref<any>(null);

watch(form.value, (val, oldVal) => {
  emit(UPDATE_MODEL_EVENT, val.username);
});

watchEffect(() => {
  if (formRef.value) {
  }
});

const handleSubmit = async () => {
  loader.value = true;
  const formDate = {
    phone: form.value.username,
  };
  console.log("formDate", formDate);

  const data = await store.authenticate(formDate);
  end.value = data.ttl * 1000;
  otp.value = true;
  emit("change", end.value);
  loader.value = false;
};
</script>

<style scoped></style>
