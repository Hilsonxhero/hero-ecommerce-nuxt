<template>
  <div>
    <div class="bg-white p-5 lg:shadow-design-base rounded-3xl">
      <template v-if="otp">
        <Otp :username="username" :end="end" @reset="otp = false" />
      </template>
      <template v-else>
        <Confirmation v-model="username" @change="handleChange" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Otp from "@/modules/user/components/otp.vue";
import Confirmation from "@/modules/user/components/confirmation.vue";

definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});
const username = ref("");
const otp = ref(false);
const end = ref("");
const handleChange = (val: any) => {
  otp.value = true;
  end.value = val;
};
</script>

<style scoped></style>
