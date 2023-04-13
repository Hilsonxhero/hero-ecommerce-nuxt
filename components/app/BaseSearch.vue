<template>
  <div class="relative t-header__box">
    <div class="relative w-full t-header__search hidden lg:flex">
      <input
        class="bg-gray-100 leading-6 rounded-xl text-sm w-full"
        type="text"
        placeholder="جستجو در محصولات ،دسته بندی و .."
        @click="handleShowSearch"
      />
      <nuxt-icon
        name="search-bulk"
        class="w-6 h-6 absolute top-1/2 mr-1 text-gray-400 cursor-pointer"
      >
      </nuxt-icon>
    </div>

    <div class="block lg:hidden" @click="handleShowSearch">
      <nuxt-icon name="search-bulk" class="w-6 h-6 lg:mr-4"></nuxt-icon>
    </div>

    <base-dialog
      @close="handleCloseSearch"
      title="جستجو"
      custom-class="lg:w-[60%]"
      v-model="visible_search"
    >
      <div class="mb-4">
        <base-form @submit="handleSubmit">
          <div class="relative w-full t-header__search">
            <input
              ref="inputRef"
              v-model="search"
              class="bg-gray-100 leading-6 rounded-xl text-sm w-full"
              type="text"
              placeholder="جستجو در محصولات ،دسته بندی و .."
            />
            <nuxt-icon
              name="search"
              class="w-6 h-6 absolute top-1/2 mr-1 text-gray-400 cursor-pointer"
            >
            </nuxt-icon>
          </div>
        </base-form>
      </div>
      <div v-if="categories.length >= 1">
        <div class="mb-3 text-gray-800 text-xs font-extrabold">
          دسته بندی ها
        </div>

        <swiper
          class="swiper-main-search"
          :modules="modules"
          :breakpoints="config.breakpoints"
          :navigation="{
            nextEl: '.swiper-button-next-search',
            prevEl: '.swiper-button-prev-search',
          }"
        >
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <nuxt-link
              to="/"
              class="whitespace-nowrap bg-gray-100 rounded-md flex items-center flex-row p-[0.375rem]"
            >
              <span class="ml-2 w-8 h-8 block flex-none"
                ><img
                  data-name="image-img"
                  :src="category.media?.thumb"
                  class="w-full h-full object-contain transition-opacity duration-500"
                />
              </span>
              <span
                class="mobile-text overflow-hidden text-ellipsis whitespace-nowrap"
                >{{ category.title }}</span
              ></nuxt-link
            >
          </swiper-slide>

          <div class="swiper-button-prev-search hidden" slot="button-prev">
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              ></path>
            </svg>
          </div>
          <div class="swiper-button-next-search hidden" slot="button-next">
            <div class="flex">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                ></path>
              </svg>
            </div>
          </div>
        </swiper>
      </div>

      <div class="mt-6" v-if="products.length >= 1">
        <div class="mb-3 text-gray-800 text-xs font-extrabold">کالاها</div>
        <div class="space-y-3 lg:mb-0 mb-[3.875rem]">
          <nuxt-link
            to="/"
            v-for="(product, i) in products"
            :key="i"
            class="block pb-3 border-gray-100 cursor-pointer border-b-2"
            ><div class="flex items-stretch space-x-6 space-x-reverse">
              <span
                class="flex-shrink-0 p-2 bg-gray-100 rounded-md w-[3.5rem] h-[3.5rem] lg:w-[4.375rem] lg:h-[4.375rem] block"
                ><img
                  data-name="image-img"
                  :src="product.media?.thumb"
                  class="w-full h-full transition-opacity duration-500 object-contain"
                />
              </span>
              <div class="flex flex-col justify-between">
                <div class="text-typo text-xs font-bold line-clamp-1 enFont">
                  {{ product.title_fa }}
                </div>
                <div
                  class="space-x-3 space-x-reverse flex items-center flex-row"
                >
                  <span class="flex items-center text-typo-light line-through">
                    <span class="text-xs font-bold"
                      >{{
                        $filters.separate(product.default_variant?.rrp_price)
                      }}
                    </span>
                  </span>
                  <span class="flex items-center">
                    <span
                      class="text-xs lg:text-sm font-extrabold text-gray-800"
                    >
                      {{
                        $filters.separate(
                          product.default_variant?.selling_price
                        )
                      }}
                    </span>
                    <span class="mr-2">تومان</span></span
                  >
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div v-if="NoResultFound">
        <div class="text-gray-700 flex justify-center my-6">
          نتیجه ای یافت نشد.
        </div>
      </div>

      <template #footer> </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useFocus } from "@vueuse/core";
import { debounce } from "lodash-unified";
import { isEmpty } from "@/utils";
import BaseDialog from "@/components/base/dialog";
const inputRef = ref();

const { focused } = useFocus(inputRef, { initialValue: true });

const router = useRouter();

const route = useRoute();

const search = ref(null);

const categories = ref([]);

const products = ref([]);

const visible_search = ref(false);

const emit = defineEmits(["show"]);

const NoResultFound = computed(() => {
  return products.value.length < 1 && categories.value < 1;
});

const config = ref({
  auto: {
    delay: 1000,
    disableOnInteraction: false,
  },
  breakpoints: {
    "320": {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    "410": {
      slidesPerView: 1.8,
      spaceBetween: 10,
    },
    "640": {
      slidesPerView: 2.1,
      spaceBetween: 10,
    },
    "768": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    "1024": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    "1200": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    "1400": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});
const handleShowSearch = () => {
  visible_search.value = true;
};
const handleSubmit = (e) => {
  e.preventDefault();
  visible_search.value = false;
  router.push({ name: "search", query: { q: search.value } });
};

const handleCloseSearch = () => {
  visible_search.value = false;

  search.value = "";
  products.value = [];
  categories.value = [];
};

const handleInputChange = () => {
  if (search.value.trim().length) {
    // ApiService.query("search", {
    //   params: { q: search.value },
    // }).then(({ data }) => {
    //   categories.value = data.data.categories;
    //   products.value = data.data.products;
    // });
  }
};

const debouncedOnInputChange = debounce(handleInputChange, 200);

watch(
  () => search.value,
  (val, prev) => {
    debouncedOnInputChange();
  }
);
</script>

<style lang="scss">
.swiper-main-search {
  &:hover {
    .swiper-button-prev-search,
    .swiper-button-next-search {
      display: flex !important;
      transition: all 0.2s ease-in-out;
    }
  }
}

.swiper-button-next-search,
.swiper-button-prev-search {
  align-items: center;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: calc(0px - var(--swiper-navigation-size) / 2);
  z-index: 2;
  border: 1px solid var(--color-neutral-300);
  height: 30px;
  width: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%);
}

.swiper-button-next-search {
  left: 3px;
}

.swiper-button-prev-search {
  right: 3px;
}

.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: #333;
}

@media (max-width: 1024px) {
}
</style>
