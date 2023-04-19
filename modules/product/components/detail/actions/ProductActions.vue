<template>
  <div>
    <div class="flex items-center">
      <div class="ml-3">
        <base-button
          icon
          variant="gray"
          @click="handleLike"
          v-if="product.is_wish"
        >
          <nuxt-icon class="text-red-500 w-7 h-7" name="heart"></nuxt-icon>
        </base-button>
        <base-button v-else icon variant="gray" @click="handleLike">
          <nuxt-icon class="text-gray-500 w-7 h-7" name="heart"></nuxt-icon>
        </base-button>
      </div>

      <div class="ml-3">
        <base-button
          v-if="current_variant?.is_announcemented_promotion"
          icon
          variant="gray"
          @click="handleAnnouncement"
        >
          <nuxt-icon
            class="text-gray-500 w-7 h-7"
            name="notification-bing"
          ></nuxt-icon>
        </base-button>
        <base-button v-else icon variant="gray" @click="handleAnnouncement">
          <nuxt-icon
            class="text-gray-500 w-7 h-7"
            name="notification-bing"
          ></nuxt-icon>
        </base-button>
      </div>

      <div class="ml-3">
        <base-button icon variant="gray">
          <nuxt-icon class="text-gray-500 w-7 h-7" name="chart"></nuxt-icon>
        </base-button>
      </div>

      <div class="">
        <base-button icon variant="gray" @click="handleShare">
          <nuxt-icon class="text-gray-500 w-7 h-7" name="share"></nuxt-icon>
        </base-button>
      </div>

      <div class="mr-3">
        <base-button icon variant="gray">
          <nuxt-icon
            class="text-gray-500 w-7 h-7"
            name="command-square"
          ></nuxt-icon>
        </base-button>
      </div>
    </div>
    <base-dialog title="اشتراک گذاری" width="50%" v-model="visible_share">
      <div class="mx-4">
        <base-button block variant="light" @click="copy(product_path)">
          <div class="flex items-center">
            <div class="text-gray-500">
              <span v-if="!copied">کپی کردن لینک</span>
              <span v-else>کپی شد!</span>
            </div>
            <span>
              <nuxt-icon
                class="text-gray-500 mr-2"
                name="clipboard-text"
              ></nuxt-icon>
            </span>
          </div>
        </base-button>

        <div class="text-gray-400 text-xs text-center my-4">
          این کالا را با دیگران به اشتراک بگذارید!
        </div>

        <div class="grid grid-cols-12 gap-2">
          <a
            target="_blank"
            :href="`https://wa.me/?text=${product_path}`"
            class="col-span-6 flex rounded-md items-center justify-center scm-whatsapp-bc p-2"
          >
            <div class="scm-whatsapp-tc">واتساپ</div>
            <div>
              <nuxt-icon
                class="scm-whatsapp-tc mr-2"
                name="whatsapp"
              ></nuxt-icon>
            </div>
          </a>
          <a
            target="_blank"
            :href="`https://t.me/share/url?text=${product_path}`"
            class="col-span-6 flex rounded-md items-center justify-center scm-telegram-bc p-2"
          >
            <div class="scm-telegram-tc">تلگرام</div>
            <div>
              <nuxt-icon
                class="scm-telegram-tc mr-2"
                name="telegram"
              ></nuxt-icon>
            </div>
          </a>
        </div>
      </div>
      <template #footer> </template>
    </base-dialog>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheckk

import { useRoute } from "vue-router";
import { BaseMessage } from "@/components/base/message";
import { useClipboard } from "@vueuse/core";
const props = defineProps({
  product: {},
  defaultVariant: {},
});

watch(
  () => props.defaultVariant,
  (val, oldVal) => {
    if (val) {
      current_variant.value = val;
    }
  },
  { deep: true }
);
const current_variant = ref({});
const product_id = ref(null);
const route = useRoute();
const visible_share = ref(false);
const product_path = ref(null);

const { text, copy, copied, isSupported } = useClipboard({ product_path });

const handleLike = () => {
  props.product.is_wish = !props.product.is_wish;
  let reqType = props.product.is_wish ? "post" : "delete";
  // ApiService[reqType](`/wishes/${props.product.id}`).then(({ data }) => {
  //   if (data.success) {
  //     if (props.product.is_wish) {
  //       BaseMessage({
  //         message: "محصول به لیست علاقه مندی های شما اضافه شد",
  //         type: "success",
  //         duration: 4000,
  //         center: true,
  //         offset: 100,
  //         "custom-class": "",
  //       });
  //     } else {
  //       BaseMessage({
  //         message: "محصول از لیست علاقه مندی های شما حذف شد",
  //         type: "success",
  //         duration: 4000,
  //         center: true,
  //         offset: 100,
  //         "custom-class": "",
  //       });
  //     }
  //   }
  // });
};

const handleAnnouncement = () => {
  current_variant.value.is_announcemented_promotion =
    !current_variant.value.is_announcemented_promotion;
  let reqType = current_variant.value.is_announcemented_promotion
    ? "post"
    : "delete";
  const data = {
    type: "promotion",
    via_sms: true,
    via_email: true,
  };
  // ApiService[reqType](`/announcements/${current_variant.value.id}`, data).then(
  //   ({ data }) => {
  //     if (data.success) {
  //       if (current_variant.value.is_announcemented_promotion) {
  //         BaseMessage({
  //           message: "محصول به لیست اطلاع رسانی  شگفت انگیز اضافه شد",
  //           type: "success",
  //           duration: 4000,
  //           center: true,
  //           offset: 100,
  //           "custom-class": "",
  //         });
  //       } else {
  //         BaseMessage({
  //           message: "محصول از لیست اطلاع رسانی شگفت انگیز حذف شد",
  //           type: "success",
  //           duration: 4000,
  //           center: true,
  //           offset: 100,
  //           "custom-class": "",
  //         });
  //       }
  //     }
  //   }
  // );
};

const handleShare = () => {
  visible_share.value = !visible_share.value;
};

onMounted(() => {
  product_path.value = window.location.href;
  product_id.value = route.params.id;
});
</script>
