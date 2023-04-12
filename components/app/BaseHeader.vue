<template>
  <div>
    <header class="t-header t-sticky-top bg-white">
      <div class="container">
        <div class="h-16">
          <div class="flex items-center h-full justify-between">
            <div class="flex items-center">
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
              <div class="hidden lg:flex">
                <BaseButton
                  class="mr-2"
                  variant="light"
                  @click="visible_search = true"
                >
                  <nuxt-icon name="user-bulk"></nuxt-icon>
                </BaseButton>

                <BaseButton class="mr-2" variant="light">
                  <nuxt-icon name="bag-bulk"></nuxt-icon>
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <base-dialog
      @close="handleCloseSearch"
      title="جستجو"
      custom-class="lg:w-[60%]"
      v-model="visible_search"
    >
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
const menus = ref([
  { title: "دسته بندی ها", to: "categories" },
  { title: "پیشنهادات ویژه", to: "promotion index" },
  { title: "مقالات", to: "articles index" },
]);
const navRef = ref(null);
const active = ref(false);
const visible_search = ref(false);

const handleCloseSearch = () => {
  visible_search.value = false;
};
</script>

<style scoped></style>
