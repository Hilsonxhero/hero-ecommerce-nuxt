<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <nuxt-icon v-else name="arrow-left" class="w-6 h-6"></nuxt-icon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { paginationNextProps } from "./VNext";

const props = defineProps(paginationNextProps);
defineEmits(["click"]);
const internalDisabled = computed(
  () =>
    props.disabled ||
    props.currentPage === props.pageCount ||
    props.pageCount === 0
);
</script>
