<template>
  <div class="mt-2">
    <ul
      v-infinite-scroll="fetchAnnouncements"
      class="grid grid-cols-12 gap-2 mt-5 mb-3"
      v-if="announcements.length >= 1"
    >
      <li
        class="col-span-12 xl:col-span-6"
        v-for="(announcement, index) in announcements"
        :key="index"
      >
        <AnnouncementProduct
          :announcement="announcement"
          :index="index"
          @delete="handleOnAnnouncementDelete"
        />
      </li>
    </ul>
    <base-skeleton animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
          <div class="col-span-6">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default> </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk
import { BaseSkeletonItem } from "@/components/base/skeleton";
import AnnouncementProduct from "@/modules/user/components/profile/announcement/Product.vue";

const props = defineProps({
  selected: {},
});

watch(
  () => props.selected,
  (val, oldVal) => {
    must_fetch.value = true;
    if (val == "announcements") {
      fetchAnnouncements();
    }
  }
);
const loading = ref<boolean>(false);

const announcements = ref([]);
const pager = ref({
  current_page: 0,
});
const must_fetch = ref(true);

const fetchAnnouncements = () => {
  if (must_fetch.value) {
    const params = new URLSearchParams();

    pager.value.current_page = +pager.value.current_page + 1;

    params.append(`page`, +pager.value?.current_page ?? 1);
    loading.value = true;
    useApiService
      .get("user/profile/announcements", {
        params: params,
      })
      .then((data) => {
        data.data.announcements.map((item, index) => {
          announcements.value.push(item);
        });
        loading.value = false;
        pager.value = data.data.pager;

        if (+pager.value.current_page == +pager.value.pages) {
          must_fetch.value = false;
        }
      });
  }
};

const handleOnAnnouncementDelete = (index) => {
  announcements.value.splice(index, 1);
};

onMounted(() => {
  if (props.selected && props.selected == "announcements") {
    fetchAnnouncements();
  }
});
</script>

<style scoped></style>
