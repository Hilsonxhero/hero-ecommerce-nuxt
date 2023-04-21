<template>
  <div class="">
    <div class="lg:border rounded-xl lg:p-4">
      <h5 class="text-xl">لیست‌ها</h5>

      <ul class="user-orders__tabs flex items-center relative mt-6">
        <li
          @click="changeTabStatus(tab)"
          class="user-orders__tab relative px-6 py-2 cursor-pointer flex items-center flex-col"
          :class="{ 'is-active': selected_tab == tab.key }"
          v-for="(tab, index) in tabs"
          :key="index"
        >
          <div class="flex items-center">
            <span
              class="text-gray-500 user-orders__tab--title whitespace-nowrap"
              >{{ tab.title }}</span
            >
          </div>
          <div
            v-show="selected_tab == tab.key"
            class="user-orders__tab--border absolute bottom-0"
          ></div>
        </li>
      </ul>

      <template v-if="selected_tab == 'wishes'">
        <Wishes :selected="selected_tab" />
      </template>

      <template v-if="selected_tab == 'announcements'">
        <Announcements :selected="selected_tab" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Wishes from "@/modules/user/components/profile/wish/Wishes.vue";
import Announcements from "@/modules/user/components/profile/announcement/Announcements.vue";
definePageMeta({
  layout: "user",
  middleware: ["auth"],
});
const tabs = ref([
  { title: "لیست علاقه مندی ", key: "wishes" },
  { title: "لیست اطلاع رسانی", key: "announcements" },
]);
const loading = ref<boolean>(false);
const selected_tab = ref(null);

const changeTabStatus = (tab) => {
  if (selected_tab.value == tab.key) {
    return false;
  } else {
    selected_tab.value = tab.key;
  }
};

onMounted(() => {
  selected_tab.value = "wishes";
});
</script>

<style scoped></style>
