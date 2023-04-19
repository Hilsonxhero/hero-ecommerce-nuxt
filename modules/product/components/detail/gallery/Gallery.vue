<template>
  <div>
    <div class="mt-5 lg:min-h-[4.5rem]">
      <section class="max-w-min hidden lg:block">
        <div class="relative">
          <div class="w-full h-full scroll-smooth">
            <div class="overflow-auto scrollbar-hidden flex items-center">
              <div
                class="cursor-pointer px-2"
                @click="openGalleryDialog(gallery)"
                v-for="(gallery, index) in galleries"
              >
                <div class="rounded-md lg:relative border-[0.0825rem]">
                  <span class="p-1 w-14 h-14 block">
                    <img
                      :src="gallery?.media?.thumb"
                      alt=""
                      class="w-full h-full transition-opacity duration-500"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <base-dialog
      custom-class="w-[70%]"
      title="تصاویر محصول"
      width="80%"
      v-model="visiable_gallery"
    >
      <div class="">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-7">
            <div class="w-full h-full scroll-smooth">
              <div class="overflow-auto scrollbar-hidden flex items-center">
                <div
                  class="cursor-pointer px-2"
                  v-for="(gallery, index) in galleries"
                  @click="handleShowPicture(gallery)"
                >
                  <div
                    class="rounded-md lg:relative border-[0.0925rem]"
                    :class="{
                      'border-blue-600': selected_image.id == gallery.id,
                    }"
                  >
                    <span class="p-1 w-14 h-14 block">
                      <img
                        :src="gallery?.media?.thumb"
                        alt=""
                        class="w-full h-full transition-opacity duration-500"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-5">
            <div class="flex justify-center items-center h-full">
              <div class="h-[20.25rem]">
                <img
                  class="w-full h-full object-contain"
                  :src="selected_image?.media?.main"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div></div>
      </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk

const props = defineProps({
  galleries: {},
});

const visiable_gallery = ref(false);
const selected_image = ref(null);

const openGalleryDialog = (gallery) => {
  selected_image.value = gallery;
  visiable_gallery.value = true;
};

const handleShowPicture = (gallery) => {
  selected_image.value = gallery;
};

watch(
  () => props.galleries,
  (currentValue, oldValue) => {}
);
onMounted(() => {});
</script>

<style scoped></style>
