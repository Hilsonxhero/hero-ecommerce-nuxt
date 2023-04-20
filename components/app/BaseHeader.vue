<template>
  <div>
    <header class="t-header t-sticky-top bg-white">
      <div class="container">
        <div class="h-16">
          <div class="flex items-center h-full justify-between">
            <div class="flex items-center">
              <base-button
                class="block lg:hidden"
                icon
                variant="gray"
                @click="showNavHandler"
              >
                <nuxt-icon class="text-gray-400" name="menu-bulk"></nuxt-icon>
              </base-button>
              <div class="hidden lg:block">
                <div href="" class="t-header__logo w-20">
                  <img src="~/assets/media/logo.png" class="max-h-75px" />
                </div>
              </div>

              <nav
                ref="navRef"
                class="hx-header__nav bg-white lg:bg-transparent flex flex-col w-[60%] lg:w-full z-[6]"
                :class="{ 'is-active': active }"
              >
                <a href="" class="mx-auto py-4 w-24 lg:hidden">
                  <nuxt-icon name="search-bulk"></nuxt-icon>
                </a>

                <ul
                  class="flex flex-col space-y-6 lg:space-y-0 p-5 lg:flex-row lg:items-center h-full"
                >
                  <li class="ml-5" v-for="(item, index) in menus">
                    <nuxt-link to="/">
                      <span class="font-normal text-gray-700">{{
                        item.title
                      }}</span>
                    </nuxt-link>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              class="flex lg:hidden items-center absolute left-1/2 transform -translate-x-1/2"
            ></div>
            <div class="flex items-center">
              <app-base-search></app-base-search>
              <div class="hidden lg:flex">
                <BaseButton
                  @click="navigateToProfile"
                  class="mr-2"
                  variant="light"
                >
                  <nuxt-icon name="user-bulk"></nuxt-icon>
                </BaseButton>

                <BaseButton
                  @click="navigateToCart"
                  class="mr-2"
                  variant="light"
                >
                  <nuxt-icon name="bag-bulk"></nuxt-icon>
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- <base-dialog
      @close="handleCloseSearch"
      title="جستجو"
      custom-class="lg:w-[60%]"
      v-model="visible_search"
    >
    </base-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const menus = ref([
  { title: "دسته بندی ها", to: "categories" },
  { title: "پیشنهادات ویژه", to: "promotion index" },
  { title: "مقالات", to: "articles index" },
]);
const navRef = ref(null);
const active = ref(false);
const visible_search = ref(false);
const router = useRouter();

const handleCloseSearch = () => {
  visible_search.value = false;
};
const showNavHandler = () => {
  active.value = true;
};

onClickOutside(navRef, (event) => {
  active.value = false;
});

const navigateToProfile = () => {
  router.push({ name: "auth" });
};
const navigateToCart = () => {
  router.push({ name: "checkout-cart" });
};
</script>

<style lang="scss" scoped>
.hx-header__nav {
  @media (max-width: 1024px) {
    transition: all 0.5s ease-in-out;
    transform: translateX(100%);
    // z-index: 70;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: stretch;

    &.is-active {
      transform: translateX(0);
    }
  }
}
</style>
