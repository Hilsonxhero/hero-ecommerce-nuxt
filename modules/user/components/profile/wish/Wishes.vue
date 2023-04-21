<template>
  <div class="mt-2">
    <ul
      v-infinite-scroll="fetchWishes"
      class="grid grid-cols-12 gap-2 mt-5 mb-3"
      v-if="wishes.length >= 1"
    >
      <li
        class="col-span-12 xl:col-span-6"
        v-for="(wish, index) in wishes"
        :key="index"
      >
        <WishProduct :wish="wish" :index="index" @delete="handleOnWishDelete" />
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
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import WishProduct from "@/modules/user/components/profile/wish/Product.vue";

const props = defineProps({
  selected: {},
});

watch(
  () => props.selected,
  (val, oldVal) => {
    // must_fetch.value = true;
    if (val == "wishes") {
      fetchWishes();
    }
  }
);
const loading = ref<boolean>(false);

const wishes = ref([]);
const pager = ref({
  current_page: 0,
});
const must_fetch = ref(true);

const fetchWishes = () => {
  if (must_fetch.value) {
    const params = new URLSearchParams();

    pager.value.current_page = +pager.value.current_page + 1;

    params.append(`page`, +pager.value?.current_page ?? 1);
    loading.value = true;
    useApiService
      .get("user/profile/wishes", {
        params: params,
      })
      .then((data) => {
        data.data.wishes.map((item, index) => {
          wishes.value.push(item);
        });
        loading.value = false;
        pager.value = data.data.pager;

        if (+pager.value.current_page == +pager.value.pages) {
          must_fetch.value = false;
        }
      });
  }
};

const handleOnWishDelete = (index) => {
  wishes.value.splice(index, 1);
};

onMounted(() => {
  if (props.selected && props.selected == "wishes") {
    fetchWishes();
  }
});
</script>

<style scoped></style>
