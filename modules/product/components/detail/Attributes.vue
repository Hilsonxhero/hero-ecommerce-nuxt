<template>
  <div>
    <div class="rounded lg:bg-white my-6 lg:mt-0">
      <div title="">
        <section class="relative text-justify leading-6 space-y-6">
          <div
            class="space-y-6 lg:space-y-10"
            v-for="(feature, index) in items"
          >
            <div>
              <div class="flex items-center mb-4 lg:mb-3">
                <h6 class="text-typo text-sm font-medium lg:px-0">
                  {{ feature.feature }}
                </h6>
              </div>
              <div class="space-y-6">
                <div
                  v-for="(item, index) in feature.values"
                  class="grid gap-x-1 grid-cols-3 px-3 py-4 lg:grid-cols-12 lg:px-6 bg-gray-100 rounded-xl"
                >
                  <div
                    class="col-span-1 text-right text-typo-light break-words text-xs lg:col-span-2 lg:w-auto lg:text-sm"
                  >
                    {{ item.title }}
                  </div>
                  <div class="col-span-2 lg:col-span-9">
                    <div
                      v-for="(value, index) in item.values"
                      class="whitespace-pre-line text-right break-words text-sm font-medium lg:text-sm"
                    >
                      {{ value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!---->
      </div>
      <!-- <div
        class="relative z-20 flex items-center justify-center mt-3 text-link cursor-pointer space-x-4 space-x-reverse lg:justify-start lg:mt-0 lg:px-6 lg:py-4 lg:text-sm lg:rounded"
      >
        <span> بستن </span>
        <i
          color="#666"
          name="t-icon-arrow_back_ios_new-24px"
          class="transform material-icons t-icon-arrow_back_ios_new-24px rotate-90"
        ></i>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Object,
  },
});
</script>

<style scoped></style>
