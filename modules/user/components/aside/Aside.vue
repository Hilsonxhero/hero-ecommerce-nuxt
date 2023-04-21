<template>
  <div
    ref="asideRef"
    class="hx-aside aside aside-hoverable drawer-end"
    :class="['aside-light', show && 'drawer-on']"
  >
    <div class="aside-logo flex-column-auto py-6">
      <nuxt-link
        :to="{ name: 'index' }"
        class="mx-auto flex justify-center w-1/2"
      >
        <!-- <img alt="Logo" :src="lightLogo" class="h-25px logo" /> -->
        <!-- <nuxt-icon name="logo" class=""></nuxt-icon> -->
        <img src="~/assets/media/logo-base.svg" class="max-h-75px" />
      </nuxt-link>

      <div
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
      >
        <span class="svg-icon svg-icon-1 rotate-180"> </span>
      </div>
    </div>

    <div class="aside-menu flex-column-fluid">
      <HXMenu></HXMenu>
    </div>

    <div class="aside-footer flex-column-auto pt-5 pb-7 px-5">
      <div href="">
        <div class="flex">
          <div>
            <base-avatar fit="cover" shape="circle">
              <img src="~/assets/media/faces/2.jpg" class="" />
            </base-avatar>
          </div>
          <div class="mr-2 w-full">
            <div class="">
              <h5>{{ store.user?.username }}</h5>
            </div>
            <h3 class="text-gray-500">{{ user?.phone }}</h3>
          </div>
        </div>

        <span class="svg-icon btn-icon svg-icon-2"> </span>
      </div>
    </div>
    <!-- <hx-overlay :active="show"></hx-overlay> -->
    <!--end::Footer-->
  </div>
</template>

<script setup lang="ts">
//@ts-nocheckk
import HXMenu from "@/modules/user/components/aside/Menu.vue";
// import useClickOutside from "@/core/hooks/useClickOutside";
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { user } = storeToRefs(store);

const asideRef = ref(null);

const show = inject("show", false);

// const { onClickOutside } = useClickOutside();

// onClickOutside(asideRef, () => {
//   if (show.value === true) {
//     show.value = false;
//   }
// });
</script>

<style scoped></style>
