<template>
  <div>
    <h1 class="flex justify-start mb-6 text-typo text-xl">
      وورد با رمز یکبار مصرف
    </h1>
    <div class="w-full">
      <base-form ref="form" class="h-full space-y-6">
        <div class="block mb-4">
          <div class="flex items-center justify-between mb-6">
            <div class="text-typo-300 text-sm cursor-pointer">
              {{ username }}
            </div>
            <div
              @click="changePhone"
              class="text-primary text-sm cursor-pointer lg:mr-0"
            >
              ویرایش شماره موبایل
            </div>
          </div>

          <div class="flex items-center">
            <base-otp :length="5" v-model="code"></base-otp>
            <div mode="out-in" class="flex flex-col justify-center mr-6 w-56">
              <Countdown
                v-if="!resend"
                :date="ttl_time"
                @finish="resend = true"
              />
              <div
                @click="handleresendCode"
                v-else
                class="inline-block text-xs cursor-pointer text-typo-light font-medium"
              >
                ارسال مجدد
              </div>
            </div>
          </div>
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
              @click="handleSendCode"
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
import { useUserStore } from "@/modules/user/store";
import Countdown from "@/components/common/countdown.vue";
// import HxNotification from "@/components/base/notification";
const props = defineProps({
  username: {
    type: String,
  },
  end: {
    type: String,
  },
});

const emit = defineEmits(["reset"]);
const resend = ref<boolean>(false);
const store = useUserStore();
const code = ref(null);
const loader = ref(false);
const router = useRouter();
const ttl_time = ref<any>(props.end);
const error = ref<any>(null);

const changePhone = () => {
  emit("reset", true);
};

const handleSendCode = async () => {
  loader.value = true;
  const form = {
    username: props.username,
    code: code.value,
  };
  try {
    const data = await store.login(form);

    if (data.success) {
      await store.init();
      console.log("hghghghg", data);

      navigateTo("/user/profile");
    } else {
      error.value = data.data;
      // HxNotification.info({
      //   title: "",
      //   message: error.value,
      //   showClose: true,
      //   duration: 3000,
      //   position: "bottom-center",
      // });
    }
    loader.value = false;
  } catch (error) {
    loader.value = false;
  }
};

const handleresendCode = async () => {
  loader.value = true;
  const form = {
    phone: props.username,
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
</script>

<style scoped></style>
