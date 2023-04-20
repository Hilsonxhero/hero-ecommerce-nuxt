<template>
  <base-dialog
    @close="handleOnClose"
    title="مشخصات آدرس"
    width="40%"
    v-model="visible_dialog"
  >
    <div>
      <base-form
        ref="formRef"
        :model="form"
        labhx-width="100px"
        class="demo-ruleForm grid grid-cols-12 gap-2"
      >
        <base-form-item
          label=" نشانی پستی"
          prop="address"
          :rules="[{ required: true, message: 'نشانی پستی ضروری می باشد' }]"
          class="col-span-12"
        >
          <base-input
            type="textarea"
            v-model="form.address"
            placeholder=" نشانی پستی را وارد کنید"
          ></base-input>
        </base-form-item>

        <base-form-item
          prop="state"
          :rules="[{ required: true, message: ' استان ضروری می باشد' }]"
          label="  استان"
          class="col-span-6"
        >
          <base-select
            v-model="form.state"
            filterable
            placeholder=" استان"
            value-key="id"
            label="name"
            :options="states"
            @change="handleChangeState"
          >
          </base-select>
        </base-form-item>
        <base-form-item
          prop="city"
          :rules="[{ required: true, message: ' شهر ضروری می باشد' }]"
          label="  شهر"
          class="col-span-6"
        >
          <base-select
            v-bind="field"
            v-model="form.city"
            filterable
            placeholder=" شهر"
            value-key="id"
            label="name"
            :options="cities"
          >
          </base-select>
        </base-form-item>

        <base-form-item
          prop="building_number"
          :rules="[{ required: true, message: ' پلاک ضروری می باشد' }]"
          label="پلاک"
          class="col-span-3"
        >
          <base-input
            v-bind="field"
            v-model="form.building_number"
          ></base-input>
        </base-form-item>
        <base-form-item
          prop="unit"
          :rules="[{ required: true, message: ' واحد ضروری می باشد' }]"
          label="واحد"
          class="col-span-3"
        >
          <base-input v-bind="field" v-model="form.unit"></base-input>
        </base-form-item>
        <base-form-item
          prop="postal_code"
          :rules="[{ required: true, message: 'کد پستی ضروری می باشد' }]"
          label="کد پستی"
          class="col-span-6"
        >
          <base-input v-bind="field" v-model="form.postal_code"></base-input>
        </base-form-item>

        <div class="flex items-center mt-4">
          <base-button :loading="loader" @click="create(formRef)"
            >ثبت آدرس</base-button
          >
          <template v-if="$slots.cancel">
            <slot name="cancel"></slot>
          </template>
        </div>
      </base-form>
    </div>
  </base-dialog>
</template>

<script setup lang="ts">
// @ts-nocheckk
import { BaseFormItem, BaseForm } from "@/components/base/form";

import { UPDATE_MODEL_EVENT } from "@/core/constants";

const props = defineProps({
  modelValue: {},
});

const formRef = ref();

const emit = defineEmits(["create", UPDATE_MODEL_EVENT]);

const loader = ref<boolean>(false);
const active = ref<boolean>(false);
const states = ref([]);
const cities = ref([]);
const form = ref({
  address: "",
  state: null,
  city: null,
  postal_code: "",
  unit: "",
  building_number: "",
  is_default: 0,
});

const visible_dialog = ref(false);

const handleOnClose = () => {
  emit(UPDATE_MODEL_EVENT, false);
};

const create = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        loader.value = true;

        const formData = {
          state_id: form.value.state,
          city_id: form.value.city,
          address: form.value.address,
          postal_code: form.value.postal_code,
          is_default: form.value.is_default,
          building_number: form.value.building_number,
          unit: form.value.unit,
        };

        const { data } = await useApiService.post(
          "user/profile/addresses",
          formData
        );

        // if (data.success) {
        //   await emit("create");
        // }

        handleOnClose();

        emit("create");

        active.value = false;
        loader.value = false;
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  });
};

const handleChangeState = (query) => {
  useApiService.get(`states/${form.value.state}/cities`).then((data) => {
    cities.value = data.data;
  });
};

watch(
  () => props.modelValue,
  (val, oldVal) => {
    visible_dialog.value = val;
  }
);

onMounted(async () => {
  const { data } = await useApiService.get("states");
  states.value = data.data;
});
</script>

<style scoped></style>
