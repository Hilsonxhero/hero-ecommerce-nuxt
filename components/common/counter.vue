<template>
  <div class="flex items-center">
    <div
      :class="[(loader || disabled) && 'pointer-events-none']"
      class="border w-10 h-10 rounded-xl flex items-center justify-center text-2xl cursor-pointer text-link"
      @click="increment"
    >
      <nuxt-icon class="w-6 h-6 text-blue-500" name="plus"></nuxt-icon>
    </div>
    <div class="w-10 text-center">
      <template v-if="loader">
        <svg class="svg-loader__circle" viewBox="-10, -10, 50, 50">
          <path
            class="svg-loader__path text-black"
            d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
            stroke="currentColor"
            style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
          ></path>
        </svg>
      </template>
      <template v-else>
        <span class="number-picker-text">
          {{ value }}
        </span>
      </template>
    </div>

    <template v-if="showDeleteBtn">
      <div
        class="border w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-link"
        @click="handleDelete"
      >
        <nuxt-icon class="w-6 h-6 text-red-500" name="trash"></nuxt-icon>
      </div>
    </template>
    <template v-else>
      <div
        :class="[loader && 'pointer-events-none']"
        class="border w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-link"
        @click="decrement"
      >
        <nuxt-icon class="w-6 h-6 text-blue-500" name="minus"></nuxt-icon>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  value: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loader: {
    type: Boolean,
    default: false,
  },
});

const showDeleteBtn = computed(() => {
  return props.value === 1;
});

const emit = defineEmits(["increment", "decrement", "delete"]);

const counter = ref<any>(props.value);

const decrement = () => {
  // counter.value === 1 ? false : (counter.value -= 1);
  emit("decrement", counter.value);
};

const increment = () => {
  emit("increment", counter.value);
};
const handleDelete = () => {
  emit("delete", counter.value);
};
</script>

<style scoped></style>
