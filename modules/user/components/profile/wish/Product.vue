<template>
  <nuxt-link
    :to="{
      name: 'products-show',
      params: { id: wish?.product.id, slug: wish?.product.slug },
    }"
  >
    <section
      class="px-3 py-3 h-full bg-white border rounded-lg isolate t-hover-shadow"
    >
      <div class="flex justify-end">
        <div class="">
          <base-button
            icon
            variant="danger"
            @click="handleDeleteWish($event, wish)"
          >
            <nuxt-icon class="w-4 h-4 text-gray-500" name="trash"></nuxt-icon>
          </base-button>
        </div>
      </div>
      <div class="relative flex items-center">
        <span class="flex-shrink-0 ml-3 w-28 h-28 block"
          ><img
            alt="Huawei  MateBook D15 R5 (3500U) 8GB 1TB + 256GB SSD Vega 8 15 inch Laptop"
            class="w-full h-full mx-auto object-contain"
            :src="wish?.product?.media?.thumb"
          />
          <div class="rounded-inherit" style="display: none">
            <div
              data-name="skeleton-customContainer"
              class="w-full h-full mx-auto cursor-wait rounded-inherit"
            >
              <div
                data-name="skeleton-custom"
                class="w-full h-full relative overflow-hidden animate-pulse delay-500 rounded-inherit"
              >
                <div
                  class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
                ></div>
                <div
                  class="w-full min-w-10 h-full bg-gray-300 min-h-10 mx-auto rounded"
                ></div>
              </div>
            </div>
          </div>
        </span>
        <div class="w-full">
          <div class="">
            <h4
              class="grid place-items-start text-right whitespace-normal text-3xs min-h-[3.5rem]"
            >
              <span class="w-full lg:text-sm line-clamp-2">
                {{ wish?.product?.title_fa }}
              </span>
            </h4>
          </div>
          <div class="flex items-end justify-end">
            <div
              class="flex flex-row items-end justify-end mt-2 space-x-2 space-x-reverse"
            >
              <div class="flex flex-col items-center justify-between">
                <span
                  v-if="
                    wish?.product?.default_variant?.is_incredible ||
                    wish?.product?.default_variant?.is_promotion
                  "
                  class="flex items-center text-sm text-typo-light line-through"
                >
                  <span class="">
                    {{
                      $filters.separate(
                        wish?.product?.default_variant?.rrp_price
                      )
                    }}
                  </span>
                </span>
                <span class="flex items-center text-sm">
                  <span class="lg:font-bold lg:text-base">
                    {{
                      $filters.separate(
                        wish?.product?.default_variant?.selling_price
                      )
                    }}
                  </span>
                  <div class="flex flex-col items-end justify-between mr-1">
                    <div class="text-xs">تومان</div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </nuxt-link>
</template>

<script setup lang="ts">
// @ts-nocheck

const props = defineProps({
  wish: {},
  index: {},
});
const emits = defineEmits(["delete"]);

const handleDeleteWish = (event, item) => {
  event.preventDefault();
  useApiService.remove(`user/profile/wishes/${item.id}`).then((data) => {
    emits("delete", props.index);
  });
};
</script>

<style scoped></style>
