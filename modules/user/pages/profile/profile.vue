<template>
  <div class="container">
    <div class="border rounded-xl p-4">
      <h5 class="text-xl">حساب کاربری</h5>

      <div class="grid grid-cols-12 gap-2 mt-4">
        <username></username>
        <mobile></mobile>
        <email></email>
        <password></password>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";
import BaseMessage from "@/components/base/message";
import Username from "@/modules/user/components/profile/update/username.vue";
import Mobile from "@/modules/user/components/profile/update/mobile.vue";
import Email from "@/modules/user/components/profile/update/email.vue";
import Password from "@/modules/user/components/profile/update/password.vue";

definePageMeta({
  layout: "user",
  middleware: ["auth"],
});

const store = useUserStore();
const { user } = storeToRefs(store);
const router = useRouter();
const active = ref<boolean>(false);
const selected = ref<any>({});

const check = (key) => {
  return selected.value.key == key;
};

const openEditUserInfoModal = () => {
  active.value = true;
};

const closeEditUserInfoModal = (value) => {
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
};

const cancelEditUserInfoModal = () => {
  active.value = false;
};

onMounted(() => {});
</script>

<style scoped></style>
